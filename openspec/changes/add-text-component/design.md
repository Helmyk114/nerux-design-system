## Context

Hoy los textos del DS se construyen con etiquetas nativas (`p`, `h1`, `span`, `label`) y clases sueltas de Tailwind, mezclando tamaños, pesos y colores sin un contrato único. La implementación vigente (`src/components/web/texto/`) refleja ese problema: su API (`variant: title | subtitle | body | caption | error`) codifica estados de validación dentro de la escala y sus mapas usan variables legacy (`--font-size-*`, `--font-weight-*`, `--color-*`) en lugar de `--nerux-*`.

Restricciones relevantes del repositorio:

- React 19 (`ref` viaja como prop), TypeScript `strict`, Tailwind v4 y HeroUI v3.
- El pipeline de tokens ya expone las escalas necesarias en `src/token/generated/primitives.css` (tamaños `xs`…`2xl`, `body`, `caption`, `title`, `subtitle`; pesos `regular`, `medium`, `semibold`, `bold`; interlineados `tight`, `normal`, `relaxed`) y los colores semánticos en `semantic.css` y `brands.css`.
- No existen tokens de `letter-spacing`, ni un tamaño mayor a 24px, ni colores de texto dedicados para `muted` y `brand`; el diseño debe resolverse con lo disponible y dejar esos huecos documentados.
- `src/components/web/select/select.tsx` consume hoy `<TextNerux variant="error">`; la migración debe actualizarlo en el mismo cambio para no romper el build.
- El barrel `src/components/web/index.ts` exporta `TextNerux` desde `./texto/texto`; el nuevo componente debe ocupar ese export sin duplicarlo.

## Goals / Non-Goals

**Goals:**

- Entregar `TextNerux` en `src/components/web/text/` con una escala semántica cerrada, polimorfismo seguro vía `as`, reenvío de `ref` y passthrough estricto de props/ARIA.
- Garantizar que tamaño, peso, interlineado, familia y color provengan exclusivamente de variables `--nerux-*`, sin utilidades tipográficas de Tailwind ni valores hardcodeados.
- Cubrir la superficie con stories de escala, pesos, colores, modificadores y temas light/dark, y con una suite de contrato en `jsdom`.
- Retirar la implementación anterior y su export sin dejar consumidores rotos.

**Non-Goals:**

- Markdown, texto enriquecido, internacionalización, truncamiento multilínea (`line-clamp`) o animaciones tipográficas.
- Agregar o modificar tokens del pipeline (los huecos detectados se resuelven con los tokens existentes y quedan como open questions).
- Cambiar `token-pipeline`, `brand-theming` o `theme-runtime`.
- Introducir `asChild`/Slot, `forwardRef` legacy (React 18) ni dependencias nuevas.

## Decisions

### D1. Polimorfismo seguro con `as`

La jerarquía visual (`variant`) se separa de la semántica del DOM (`as`). El tag por defecto se deriva de la variante y `as` lo sobrescribe:

| `variant` | Tag por defecto |
| --- | --- |
| `display`, `h1` | `h1` |
| `h2` | `h2` |
| `h3` | `h3` |
| `h4` | `h4` |
| `body-lg`, `body-md`, `body-sm` | `p` |
| `caption`, `overline` | `span` |

Tipado:

```ts
type TextOwnProps = {
  as?: ElementType;
  variant?: TextVariant;
  size?: TextVariant;
  weight?: TextWeight;
  color?: TextColor;
  align?: TextAlign;
  truncate?: boolean;
  italic?: boolean;
  uppercase?: boolean;
  noWrap?: boolean;
  className?: string;
};

export type TextProps<T extends ElementType = "p"> = TextOwnProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof TextOwnProps> & {
  ref?: ComponentPropsWithRef<T>["ref"];
};
```

- El componente se declara genérico (`<T extends ElementType = "p">`) para que `as="a"` infiera `href`, `target`, eventos y el tipo de `ref` del elemento elegido.
- `as` y las props propias se destructuran y **nunca** se reenvían al DOM; el resto se propaga tal cual (`id`, `role`, `aria-*`, `data-*`, handlers).
- En runtime se resuelve un único `Component = as ?? defaultElement[variant]` y se renderiza con el resto de props. No hay hooks ni estado: el componente es puro y seguro para SSR/RSC.
- Alternativas descartadas: `forwardRef` + uniones de tags (pierde inferencia y obliga a `any` en el ref) y `asChild` (fuera de alcance y añade un contrato que el DS aún no usa).

### D2. Contrato de tipos y precedencia de props

- `variant`: `display | h1 | h2 | h3 | h4 | body-lg | body-md | body-sm | caption | overline`, default `body-md`.
- `size`: alias de `variant` aceptado por compatibilidad de lenguaje del proposal. Si ambos se envían, `variant` gana; `size` nunca se reenvía al DOM. El alias se documenta como deprecado y se reevalúa en un follow-up.
- `weight`: `regular | medium | semibold | bold`. Si se omite, se aplica el peso por defecto de la variante (ver D3); si se envía, reemplaza ese valor (no se acumulan clases).
- `color`: `default | secondary | muted | success | warning | danger | brand | inverse`, default `default`.
- `align`: `left | center | right | justify`; sin default (no se emite clase si se omite).
- Modificadores booleanos: `truncate`, `italic`, `uppercase`, `noWrap`, default `false`.
- `ref` se tipa con `ComponentPropsWithRef<T>["ref"]` y se pasa al elemento renderizado; en React 19 viaja dentro de las props.
- `TextProps` omite de las props nativas cualquier clave propia (`color`, `size`, `as`, etc.) para que no haya colisiones ni fugas al DOM.
- Alternativa descartada: CVA (`class-variance-authority`). No está en el repo y los mapas `Record` + `clsx` ya son el patrón de `InputNerux`; añadir CVA no aporta aquí.

### D3. Puente de tokens tipográficos y de color

Cada eje se resuelve en un mapa independiente (`text.variants.ts`) y se emite una sola clase por eje, siempre como propiedad CSS arbitraria alimentada por un token:

- Tamaño: `[font-size:var(--nerux-font-size-*)]`
- Peso: `[font-weight:var(--nerux-font-weight-*)]`
- Interlineado: `[line-height:var(--nerux-line-height-*)]`
- Familia: `[font-family:var(--nerux-font-family-heading|body)]`
- Color: `[color:var(--nerux-color-*)]`

Escala de variantes:

| `variant` | Tamaño | Peso por defecto | Interlineado | Familia |
| --- | --- | --- | --- | --- |
| `display` | `2xl` (24px) | `bold` | `tight` | heading |
| `h1` | `title` (24px) | `semibold` | `tight` | heading |
| `h2` | `xl` (20px) | `semibold` | `tight` | heading |
| `h3` | `lg` (16px) | `semibold` | `tight` | heading |
| `h4` | `md` (14px) | `semibold` | `normal` | heading |
| `body-lg` | `lg` (16px) | `regular` | `relaxed` | body |
| `body-md` | `body` (14px) | `regular` | `normal` | body |
| `body-sm` | `sm` (13px) | `regular` | `normal` | body |
| `caption` | `caption` (12px) | `regular` | `normal` | body |
| `overline` | `xs` (12px) | `semibold` | `normal` | body |

`overline` incluye `[text-transform:uppercase]` como parte de la variante; el modificador `uppercase` es idempotente y queda disponible para el resto de variantes.

Colores:

| `color` | Token |
| --- | --- |
| `default` | `--nerux-color-text-default` |
| `secondary` | `--nerux-color-text-secondary` |
| `muted` | `--nerux-color-text-disabled` |
| `success` | `--nerux-color-success-text` |
| `warning` | `--nerux-color-warning-text` |
| `danger` | `--nerux-color-danger-text` |
| `brand` | `--nerux-brand-base` |
| `inverse` | `--nerux-color-text-inverse` |

Decisiones y compromisos:

- `muted` reutiliza `text-disabled` porque es el único token de texto atenuado existente. Es un uso presentacional: no comunica estado deshabilitado ni debe usarse en controles deshabilitados.
- `brand` usa `--nerux-brand-base` (theme/brand-aware) porque no existe `--nerux-color-brand-text`. El contraste en dark y en la brand `custom` se verifica en Storybook; si no cumple AA, se resuelve con un token nuevo en un cambio posterior.
- `display` y `h1` comparten 24px porque el pipeline no tiene un tamaño mayor. Se diferencian por peso (`bold` vs `semibold`), familia e interlineado; la limitación queda como open question.
- No se usan clases como `text-lg`, `font-semibold`, `leading-tight` ni `text-neutral-900`: todas las valores salen de `var(--nerux-*)`.

### D4. Modificadores y utilidades

Los modificadores se implementan con propiedades CSS explícitas, sin valores tipográficos:

- `truncate`: `[display:block] [overflow:hidden] [text-overflow:ellipsis] [white-space:nowrap]`. Se fuerza `block` porque `text-overflow` no funciona de forma fiable en elementos inline; el efecto en un `span` se documenta en la story.
- `noWrap`: `[white-space:nowrap]`. Si convive con `truncate`, se emite una sola vez.
- `italic`: `[font-style:italic]`.
- `uppercase`: `[text-transform:uppercase]`.
- `align`: `[text-align:left|center|right|justify]`.

Orden de composición con `clsx`: variante → peso → color → alineación → modificadores → `className` del consumidor. `className` va al final para que el consumidor pueda añadir layout o overrides sin que el componente los pise.

### D5. Estrategia de pruebas (`text.test.tsx`, `jsdom`)

Se sigue el patrón de `input.test.tsx`: `// @vitest-environment jsdom`, `@testing-library/react`, `expectTypeOf` y lectura de los CSS generados.

1. **Contrato de render**: default `body-md` renderiza `<p>`; cada variante renderiza el tag por defecto de la tabla D1 y las clases de tamaño/familia/interlineado esperadas.
2. **Polimorfismo**: `as="h2"` con `variant="body-sm"` conserva las clases de `body-sm` y cambia el tag; `as="a"` con `href` renderiza un ancla y no filtra `as` al DOM. `expectTypeOf` valida la inferencia de `href` y del `ref`.
3. **Ejes independientes**: `weight` sobrescribe el default de la variante sin duplicar clases de peso; `color`, `align` y modificadores emiten exactamente una clase cada uno.
4. **Passthrough y accesibilidad**: `id`, `role`, `aria-label`, `aria-describedby`, `data-*`, `onClick` y `className` llegan al elemento; `ref` apunta al nodo DOM correcto.
5. **Gobierno de tokens**: se leen `primitives.css`, `semantic.css`, `brands.css` y `aliases.css`, se construye el set de tokens canónicos y se afirma que cada `var(--nerux-*)` referenciado por los mapas existe. No se permiten tokens locales.
6. **Prohibiciones**: se afirma que ningún mapa contiene utilidades tipográficas de Tailwind (`text-{size}`, `font-{weight}`, `leading-*`, `tracking-*`, colores de paleta) ni valores `#`, `rgb(`, `hsl(`.

## Risks / Trade-offs

- **`display` y `h1` comparten tamaño (24px)** → Mitigación: peso, familia e interlineado distintos; se documenta en la story y se propone un token `font-size-display` como follow-up.
- **`muted` y `brand` no tienen token de texto propio** → Mitigación: `muted` usa `text-disabled` con semántica presentacional explícita; `brand` usa `--nerux-brand-base` y se valida contraste AA en light/dark y brand custom antes de cerrar el cambio.
- **`truncate` cambia el `display` a `block`** → Mitigación: se documenta en la story y en la API; para usos inline el consumidor puede omitir `truncate` o envolver en un contenedor con ancho definido.
- **El alias `size` duplica la fuente de verdad** → Mitigación: `variant` tiene precedencia, ambos se tipan igual y el comportamiento se cubre con un test; se reevalúa retirarlo cuando no haya consumidores.
- **Polimorfismo con componentes de terceros**: el `ref` y las props siguen el tipo del componente destino, pero el componente no puede garantizar que ese destino reenvíe el ref → Mitigación: documentar que `as` está pensado para tags HTML y componentes que respeten `ref`/props nativas.
- **La auditoría de tokens es estática** (regex + set de tokens), no valida el CSS computado → Mitigación: la suite se complementa con revisión visual y a11y en Storybook en ambos temas.
- **Acoplamiento con `select`**: borrar `texto/` antes de migrar `select.tsx` rompe el build → Mitigación: el orden de migración actualiza `select` primero y elimina la carpeta al final.
- **Colisión de exports** en `src/components/web/index.ts` → Mitigación: el cambio de export y el borrado de `texto/` van en el mismo commit; el build y los tests lo verifican.

## Migration Plan

1. Crear `src/components/web/text/` con `text.types.ts`, `text.variants.ts`, `text.tsx` e `index.ts`.
2. Agregar `text.stories.tsx` con las stories `Scale`, `Weights`, `Colors`, `AlignAndModifiers` y `Playground`, reutilizando el toolbar global de temas/brand de Storybook.
3. Agregar `text.test.tsx` y ejecutar `pnpm test` hasta que la suite nueva y la existente pasen.
4. Migrar `src/components/web/select/select.tsx` de `<TextNerux variant="error">` a `<TextNerux variant="caption" color="danger">`, preservando el layout del `FieldError`.
5. Reemplazar en `src/components/web/index.ts` el export `./texto/texto` por `./text` y exportar `TextProps`, `TextVariant`, `TextWeight`, `TextColor`, `TextAlign` y los mapas públicos necesarios.
6. Eliminar `src/components/web/texto/` (`texto.tsx`, `texto.types.ts`, `texto.variant.ts`, `texto.stories.tsx`, `index.ts`) y verificar que no queden imports.
7. Verificar: `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm tokens:check`, revisión visual en Storybook (light/dark y brand custom) y `openspec validate --strict add-text-component`.

Rollback: el cambio no persiste datos ni migra esquemas. Revertir el commit restaura `texto/`, su export y el uso en `select`; no se requiere limpieza adicional.

## Open Questions

- ¿Se agrega un token `--nerux-font-size-display` (o `3xl`) al pipeline para separar `display` de `h1`?
- ¿Se agregan tokens `--nerux-color-text-muted` y `--nerux-color-brand-text` para eliminar los préstamos `text-disabled` y `brand-base`?
- ¿Se mantiene el alias `size` a largo plazo o se retira cuando no haya consumidores?
- ¿Se necesita `letter-spacing` tokenizado para `display`/`overline`, o el tracking por defecto es suficiente?
- ¿Se soportará `asChild`/Slot en una futura iteración de las primitivas del DS?
