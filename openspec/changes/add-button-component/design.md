# Design: ButtonNerux

## Context

`ButtonNerux` vive en `src/components/web/button/` y hoy es un wrapper mínimo sobre `Button` de HeroUI v3:

- Declara `startIcon`/`endIcon` como `IconName` pero nunca los renderiza.
- Exige `color` (`primary | disabled | danger | neutral`) aunque tenga default y fija `variant="primary"` en HeroUI.
- No acepta ni reenvía `ref`, y no propaga props nativas más allá de `isDisabled`/`isPending`/`type`.
- Aplica clases con `--color-*` legacy mezcladas con `--nerux-*`.
- No tiene suite de componente: el proyecto `unit` de Vitest corre en `environment: "node"` y no están instaladas `@testing-library/react` ni `jsdom`.

Restricciones que gobiernan el diseño:

- El DS es web-only en este change; no hay paquete native.
- La fuente de verdad de color es `src/token/source/semantic.ts` y las variables generadas usan el namespace `--nerux-*`.
- `@heroui/react` v3 ya es peer dependency; sus variantes reales son `primary | secondary | tertiary | outline | ghost | danger | danger-soft`.
- Navegación: cero `href`, delegada a `Link` de `@heroui/react`.

Hallazgo relevante durante el diseño: el CSS de `Button` de HeroUI resuelve sus estados leyendo variables locales `--button-bg`, `--button-bg-hover`, `--button-bg-pressed` y `--button-fg`. Esas variables se alimentan de `--accent-hover`, `--default-hover`, `--danger-hover`, `--danger-soft*`, que **no existen** en `src/token/generated/heroui.css` (solo están los valores base). Con la implementación actual, el hover de varias variantes queda con un `var()` sin resolver. El diseño debe cubrir ese hueco sin tocar el pipeline.

## Goals / Non-Goals

**Goals:**

- Contrato público tipado, estable y documentado por la capability `button`.
- Consumo trazable y exclusivo de `--nerux-*` en todas las clases de color del componente.
- `<button>` nativo siempre; `href` imposible en tipos y en runtime.
- `ref` real al `<button>`, passthrough de props nativas y de HeroUI.
- Estado de carga completo: `isPending`, `Spinner`, `aria-busy` e interacción bloqueada.
- Slots `startContent`/`endContent` renderizados y testeables.
- Suite de contrato en jsdom + stories actualizadas.

**Non-Goals:**

- Native/mobile y `ButtonGroup`.
- Nuevos tokens o cambios en los valores del pipeline (solo se admite ampliar `contrastPairs` para tests).
- Estilos de navegación tipo botón para `Link`; este change solo documenta el límite.
- Codemod para consumidores externos; el breaking change se documenta.
- API específica para icon-only más allá del passthrough de `isIconOnly`.

## Decisions

### D1. Wrapper sobre HeroUI, no reimplementación

`ButtonNerux` renderiza `Button` de `@heroui/react` y agrega la capa del DS. No se copia markup ni se reimplementan press/keyboard/focus: React Aria ya resuelve `onPress`, foco visible, `aria-disabled` y `type`.

Alternativas descartadas:

- Copiar el markup de HeroUI: pierde accesibilidad y obliga a mantener el comportamiento a mano.
- Renderizar un `<a>` cuando llega `href`: viola el requisito de navegación.

### D2. Contrato de tipos

```ts
type HeroButtonProps = ComponentPropsWithRef<typeof HeroButton>;

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline"
  | "ghost"
  | "danger"
  | "danger-soft";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<
    HeroButtonProps,
    "variant" | "size" | "children" | "isPending" | "color" | "render"
  > {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  children?: ReactNode;
}
```

- `isPending` se omite a propósito: la única API de carga es `isLoading`.
- `children` se estrecha a `ReactNode`; no se expone la render-prop de HeroUI.
- `ref` viaja dentro de `ComponentPropsWithRef`, sin `forwardRef` (React 19).
- Se conserva el nombre exportado `ButtonNerux`.

### D3. Capa de color propia alimentando las variables locales de HeroUI

HeroUI estructura el botón y maneja hover/pressed/focus/disabled leyendo `--button-*`. El DS define esos valores con tokens `--nerux-*` mediante clases de propiedad arbitraria de Tailwind:

```
[--button-bg:var(--nerux-color-primary-bg-default)]
[--button-bg-hover:var(--nerux-color-primary-bg-hover)]
[--button-bg-pressed:var(--nerux-color-primary-bg-active)]
[--button-fg:var(--nerux-color-primary-foreground)]
```

Así el estado lo sigue resolviendo el CSS de HeroUI, pero el color lo posee el DS y queda visible en el `className` (testeable). No se pelea contra la especificidad de `.button--primary`: se reemplazan sus valores, no sus reglas.

Mapa por variante:

| Variante | `--button-bg` | `--button-bg-hover` | `--button-bg-pressed` | `--button-fg` |
|---|---|---|---|---|
| `primary` | `color-primary-bg-default` | `color-primary-bg-hover` | `color-primary-bg-active` | `color-primary-foreground` |
| `secondary` | `color-mix(secondary-bg-default 80%, text-default)` | `color-mix(secondary-bg-default 72%, text-default)` | `color-mix(secondary-bg-default 64%, text-default)` | `color-secondary-text-default` |
| `tertiary` | `color-surface-secondary` | `color-surface-hover` | `color-surface-active` | `color-text-default` |
| `outline` | `transparent` | `color-surface-hover` | `color-surface-active` | `color-text-default` |
| `ghost` | `transparent` | `color-surface-hover` | `color-surface-active` | `color-text-default` |
| `danger` | `color-danger` | `color-mix(danger 88%, text-default)` | `color-mix(danger 78%, text-default)` | `color-text-inverse` |
| `danger-soft` | `color-danger-bg` | `color-mix(danger-bg 88%, text-default)` | `color-mix(danger-bg 78%, text-default)` | `color-danger-text` |

Todos los nombres llevan el prefijo `--nerux-`. `outline` agrega `border-color: var(--nerux-color-border-default)`.

Decisiones puntuales:

- `danger` y `danger-soft` no tienen tokens de hover/pressed. Se derivan con `color-mix(in oklch, …)` mezclando con `--nerux-color-text-default`, que es oscuro en light y claro en dark: el hover oscurece en light y aclara en dark, sin `dark:` ni valores hardcodeados.
- `secondary` parte de `color-secondary-bg-default` y se mezcla con `color-text-default` al 80/72/64 %. El token cyan-600 sobre blanco solo alcanza 3.68:1, por debajo de AA; la mezcla oscurece el fondo en light y lo aclara en dark, y conserva `color-secondary-text-default` como foreground. No se modifica ningún token del pipeline.
- El estado `disabled` usa `status-disabled` de HeroUI (opacidad + `pointer-events: none`), no el token `color-primary-bg-disabled`. Mezclar ambos duplicaría el apagado. Los tokens de disabled siguen disponibles para otros componentes.
- El anillo de foco no se redefine: HeroUI usa `--focus`, ya mapeado a `--nerux-color-focus`.

Alternativas descartadas:

- Confiar solo en las variantes de HeroUI: no hay rastro de `--nerux-*` en el componente y el hover de `danger` queda roto por las variables faltantes.
- Clases de color completas propias (`bg-*`, `hover:bg-*`): duplica la máquina de estados, compite con `.button--*` y se desincroniza con el foco/pressed de HeroUI.

### D4. Navegación: cero `href`

- `ButtonProps` no declara `href` ni ningún atributo de ancla, y omite la prop `render` de HeroUI (permitiría sustituir el `<button>` por un `<a>`).
- El componente siempre renderiza el `<button>` de HeroUI; no acepta `render` como `<a>` ni `as`.
- Antes del spread se descartan `href`, `target`, `rel`, `download`, `hrefLang`, `ping`, `referrerPolicy` y `render`, incluso si llegan por un cast (`as any`), para que el DOM nunca los reciba ni se sustituya el elemento.
- La navegación se documenta y se resuelve con `Link` de `@heroui/react` (`<Link href="…">…</Link>`), no con el botón.

Alternativa descartada: un booleano `asChild`/`render` que permita `<a>`; reabre exactamente el problema que este change cierra.

### D5. Estado de carga

```tsx
<HeroButton
  isPending={isLoading}
  ...
>
  {isLoading ? <Spinner size="sm" color="current" /> : startContent}
  {children}
  {endContent}
</HeroButton>
```

- `isLoading` → `isPending` de HeroUI: activa `data-pending`, `status-pending` y bloquea la interacción.
- `aria-busy="true"` se aplica explícitamente sobre el `<button>` resuelto mediante la `ref` fusionada y un `useEffect`, porque `filterDOMProps` de React Aria descarta `aria-busy` (solo permite `aria-label`, `aria-labelledby`, `aria-describedby` y `aria-details`).
- El `Spinner` de HeroUI ya expone `data-slot="spinner"`, `role="status"` y `aria-label="Loading"`; no se inventan atributos para tests.
- Precedencia: mientras carga, el `Spinner` ocupa el lugar de `startContent` para no mostrar dos indicadores iniciales. `endContent` se mantiene.
- `isDisabled` y `isLoading` son independientes; si ambos están activos, HeroUI aplica disabled y pending.

### D6. Slots

Se pasan como hijos directos del botón, sin wrappers: `startContent`, `children`, `endContent`. El `gap` y las reglas de tamaño de SVG de `.button` aplican por descendencia, así que un wrapper solo agregaría ruido al DOM. En tests se usan elementos identificables dentro de cada slot para verificar el orden.

### D7. Ref y passthrough

- `ref` se reenvía a HeroUI Button, que lo reenvía al `<button>` de React Aria.
- El resto de props se propaga después de las props controladas por el DS, salvo las de enlace (D4) y `isPending`.
- `aria-busy` se sincroniza con `isLoading` en el `<button>` resuelto (`setAttribute`/`removeAttribute`); si el consumidor pasa otro valor, `isLoading` manda.
- `type` mantiene default `"button"` para evitar submits accidentales.
- `className` se compone con `clsx(buttonColorVariants[variant], className)`: el consumidor puede agregar layout sin perder los colores.

### D8. Estrategia de pruebas

Archivo: `src/components/web/button/button.test.tsx`, con `// @vitest-environment jsdom` por archivo (el proyecto `unit` sigue en `node`). Se agregan `@testing-library/react` y `jsdom` como devDependencies; no se toca `vite.config.ts`. `afterEach(cleanup)` explícito.

Bloques:

1. **Tokens**
   - Extraer todos los `var(--…)` del `className` y exigir que cada uno empiece con `--nerux-`.
   - Rechazar cualquier `--color-*` legacy.
   - Verificar que cada token referenciado esté declarado en `src/token/generated/semantic.css` (sin tokens huérfanos).
   - Contraste: no se recalcula desde CSS (jsdom no resuelve cadenas `var()`); se apoya en la derivación de marca y en `contrastPairs`. Si el par sólido de `danger` no está en `contrastPairs`, se agrega allí con los valores por defecto, sin crear tokens. `validateContrast()` se ejecuta en la suite de tokens (node), no en jsdom: `scripts/build-tokens.ts` resuelve rutas con `import.meta.url`, que no es `file:` bajo jsdom. En `button.test.tsx` los pares registrados se validan con `contrastRatio`.
2. **Cero `href`**
   - `tagName === "BUTTON"`, `hasAttribute("href") === false`.
   - Inyectar `href` por cast y comprobar que igualmente no llega al DOM.
   - `expectTypeOf<ButtonProps>().not.toHaveProperty("href")`.
3. **Passthrough**
   - `ref` resuelve a `HTMLButtonElement`.
   - `aria-label` y `className` personalizado presentes en el DOM.
   - `onPress` se dispara con `fireEvent.click` (fallback a `userEvent` si hiciera falta).
   - `type="button"` por defecto.
4. **Carga**
   - `aria-busy="true"`, `data-pending="true"`, un solo `[data-slot="spinner"]`.
   - `startContent` no se renderiza mientras carga.
   - Click durante la carga no dispara `onPress`.
   - Sin `isLoading`, no hay `aria-busy` ni spinner.
5. **Slots**
   - `startContent` y `endContent` presentes a la vez.
   - Orden DOM: start → children → end.
   - Con `isLoading`, el spinner sustituye a `startContent`.

Tipos: `expectTypeOf` de Vitest cubre el contrato estático de `href`; el resto son aserciones de DOM.

Limitación asumida: jsdom no calcula estilos, así que el test valida el **wiring** de tokens, no el color renderizado. La verificación visual y de contraste final queda en Storybook + `tokens:check`.

### D9. Stories y archivos

- `button.stories.ts` → `button.stories.tsx` para poder usar JSX en los slots.
- Stories: matriz de las 7 variantes, 3 tamaños, `isLoading`, `startContent` + `endContent`, `isDisabled`, `fullWidth` y un caso icon-only con `aria-label`.
- `button.varaint.ts` → `button.variants.ts` (corrige el typo) con el mapa de color.
- `index.ts` del botón exporta `ButtonNerux`, `ButtonProps`, `ButtonVariant`, `ButtonSize` y el mapa de variantes.
- `src/components/web/index.ts` no cambia su export público.

## Risks / Trade-offs

| Riesgo | Mitigación |
|---|---|
| Las variables `--button-*` son un detalle interno de HeroUI y podrían renombrarse en una minor. | Se fijan en un único mapa (`button.variants.ts`) y la suite falla si desaparecen del CSS o del DOM. Actualizar HeroUI implica revisar ese archivo. |
| El `className` con propiedades arbitrarias se vuelve largo y difícil de leer. | Mapa declarativo por variante; el test valida el wiring, no la estética. |
| `color-mix` en `danger`/`danger-soft` no tiene un token de hover dedicado. | Mezcla theme-aware con `text-default`; si el resultado visual no convence, se agregan tokens en un change posterior. |
| jsdom no valida contraste real. | `validateContrast()` + `bestForeground` cubren los pares; Storybook y el addon a11y cubren lo visual. |
| Agregar RTL/jsdom afecta instalación y CI. | Solo se agregan al proyecto `unit` vía docblock; no se habilita browser mode para estos tests. |
| Breaking change para consumidores de `color` y `startIcon`/`endIcon`. | Se documenta en stories y en el resumen del change; no hay consumidores internos fuera de las stories. |
| `aria-busy` + `role="status"` del spinner pueden anunciar dos veces. | Se valida en la revisión a11y; si molesta, el spinner queda `aria-hidden` y el anuncio lo lleva `aria-busy`. |

## Migration Plan

1. Agregar devDependencies (`@testing-library/react`, `jsdom`) y actualizar el lockfile.
2. Crear `button.variants.ts`, reescribir `button.types.ts` y `button.tsx`, y actualizar `index.ts`.
3. Migrar `button.stories.ts` a `.tsx` con la nueva API.
4. Agregar `button.test.tsx` y ampliar `contrastPairs` solo si falta el par de `danger`.
5. Ejecutar `pnpm test`, `pnpm lint`, `pnpm build` y `pnpm tokens:check`.
6. Verificar en Storybook las 7 variantes en light y dark, con foco, hover y loading.

Rollback: el change es autocontenido en `src/components/web/button/` más el lockfile. Revertir el commit restaura el wrapper anterior y las stories viejas; no hay migraciones de datos ni cambios de tokens.

## Open Questions

- ¿El `Spinner` debe ser `aria-hidden` para evitar doble anuncio con `aria-busy`, o se mantiene su `role="status"` como hace HeroUI? Se decide con la revisión a11y.
- ¿Los consumidores necesitan un alias temporal `isPending` durante la migración? Por ahora no: una sola API de carga.
- ¿Conviene exponer un `ButtonLink` en un change futuro que componga `Link` con los estilos del botón, o alcanza con documentar `Link`?
