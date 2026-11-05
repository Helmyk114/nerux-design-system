## Why

`ButtonNerux` es hoy un wrapper incompleto: declara `startIcon`/`endIcon` que nunca renderiza, exige `color` pese a tener default, no reenvía `ref` ni props nativas, mezcla variables legacy `--color-*` con `--nerux-*` y no tiene un estado de carga real. Como el botón es la pieza de entrada de cualquier interfaz, su contrato debe quedar fijado antes de construir el resto de componentes encima.

## What Changes

- Se reescribe el botón web como wrapper tipado sobre `Button` de HeroUI v3, con esta superficie pública:
  - `variant`: `primary | secondary | tertiary | outline | ghost | danger | danger-soft` (default `primary`).
  - `size`: `sm | md | lg` (default `md`).
  - `isLoading`, `isDisabled`, `type`.
  - `startContent` y `endContent` (`ReactNode`), renderizados a ambos lados del contenido.
  - `ref` al `<button>` subyacente y passthrough del resto de props de HeroUI (`onPress`, `aria-*`, `className`, `fullWidth`, `isIconOnly`, …).
- `isLoading` se traduce a `isPending` de HeroUI, inyecta un `Spinner` y expone `aria-busy`; bloquea la interacción mientras dura la carga.
- El componente consume exclusivamente variables `--nerux-*`. Se eliminan las clases basadas en `--color-*` y no se aceptan colores fuera de los tokens.
- **BREAKING**: se elimina la prop `color` (`primary | danger | neutral | disabled`). El color se expresa con `variant` y el estado deshabilitado con `isDisabled`.
- **BREAKING**: `startIcon`/`endIcon` (`IconName`) se reemplazan por `startContent`/`endContent` (`ReactNode`), que ahora sí se renderizan.
- **BREAKING**: se renombra `button.varaint.ts` a `button.variants.ts` y se ajustan los exports internos.
- Se excluye `href` y cualquier render como `<a>`: el componente siempre renderiza un `<button>`. La navegación se resuelve exclusivamente con `Link` de `@heroui/react`.
- Se actualizan las stories (todas las variantes, tamaños, loading, slots y disabled).
- Se agrega `src/components/web/button/button.test.tsx` como suite de contrato obligatoria del componente, cubriendo:
  1. **Tokens y contraste**: toda referencia `var(--…)` de las clases de color apunta a `--nerux-*` (sin `--color-*` legacy), cada token referenciado existe en el CSS generado y los pares fondo/foreground de cada variante quedan cubiertos por la validación de contraste del token pipeline (ampliando `contrastPairs` si falta un par, sin crear tokens).
  2. **Exclusión de `href`**: el render produce siempre un `<button>`, no se emite ningún atributo `href` y el tipo público no declara esa prop.
  3. **Passthrough**: la `ref` apunta al `<button>` nativo y se reenvían `aria-*`, `className` y manejadores de eventos (`onPress`).
  4. **Carga**: con `isLoading` se propaga `isPending`, se inyecta un `Spinner` y el botón expone `aria-busy="true"`.
  5. **Slots**: `startContent` y `endContent` se renderizan simultáneamente, en el orden esperado alrededor del contenido.
- Fuera de alcance: implementación native/mobile, `ButtonGroup`, tokens nuevos y cambios en los valores del pipeline de tokens (solo se admite ampliar la lista de pares de contraste para tests).

## Capabilities

### New Capabilities

- `button`: contrato público del botón web — variantes, tamaños, estados (hover, focus, pressed, disabled, loading), slots de contenido, accesibilidad, consumo estricto de tokens `--nerux-*` y prohibición de navegación vía `href`.

### Modified Capabilities

Ninguna. El botón se apoya en los tokens y en el theming ya especificados en `token-pipeline`, `brand-theming` y `theme-runtime`; no cambia ningún requisito existente ni requiere tokens nuevos.

## Impact

- `src/components/web/button/button.tsx` — reescritura del componente.
- `src/components/web/button/button.types.ts` — nueva superficie de props.
- `src/components/web/button/button.varaint.ts` → `button.variants.ts` — mapa de variantes y tamaños sobre tokens `--nerux-*`.
- `src/components/web/button/button.stories.ts` → `button.stories.tsx` — stories con JSX para slots.
- `src/components/web/button/index.ts` y `src/components/web/index.ts` — exports actualizados; se conserva el nombre público `ButtonNerux` por consistencia con el resto del DS.
- `src/components/web/button/button.test.tsx` — nuevo, suite de contrato y accesibilidad con los cinco bloques anteriores.
- `vite.config.ts` — sin cambio de proyecto: el test de componente declara `@vitest-environment jsdom` por archivo, porque el proyecto `unit` corre en `node` y no puede resolver refs, atributos ni eventos.
- Dependencias de desarrollo: se agregan `@testing-library/react` y `jsdom` (hoy no están instaladas); `@heroui/react` (con `Button` y `Spinner`) ya es peer dependency y `Link` queda como única vía de navegación documentada.
- Consumidores actuales del botón: el cambio es breaking por `color` y por `startIcon`/`endIcon`; las stories se actualizan en el mismo change.
