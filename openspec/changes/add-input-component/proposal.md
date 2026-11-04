## Why

`InputNerux` es la primitiva de entrada de texto del Design System y hoy no tiene un contrato cerrado: deriva la etiqueta de `name`, usa `error` como único estado de validación, expone `startIcon`/`endIcon` como nombres de icono, no reenvía `ref` ni todas las props nativas, y mezcla variables legacy `--color-*` con `--nerux-*`. Antes de construir formularios, selects y otros componentes compuestos, el input debe unificarse sobre HeroUI v3 con estados, tokens y accesibilidad verificables.

## What Changes

- Se migra `InputNerux` a un wrapper tipado sobre las primitivas de entrada de HeroUI v3 (`TextField`/`Input`/`InputGroup`).
- Superficie pública:
  - `variant`: `primary | secondary` (default `primary`), delegada a HeroUI.
  - `size`: `sm | md | lg` (default `md`).
  - `label`, `description` y `errorMessage`.
  - `startContent` y `endContent` (`ReactNode`) a ambos lados del campo.
  - `type` (incluye `password` con toggle de visibilidad integrado), `isDisabled`, `isReadOnly`, `isRequired`, `value`, `defaultValue`, `onChange`, `placeholder`, `name`, `autoComplete` y el resto de props nativas/HeroUI.
  - `ref` al elemento `<input>` subyacente.
- Accesibilidad: asociación `label`/`id`, `aria-invalid` automático cuando hay `errorMessage`, `aria-describedby` para descripción y error, semántica de requerido/deshabilitado/solo lectura y foco visible con el anillo del DS.
- Consumo exclusivo de variables `--nerux-*` para superficies, bordes, textos, foco y validación. La paleta semántica `success`, `warning`, `danger` e `info` es la única fuente de color de estado; no se admiten `--color-*` legacy ni colores hardcodeados.
- **BREAKING**: `error` se reemplaza por `errorMessage`; `startIcon`/`endIcon` (`IconName`) por `startContent`/`endContent` (`ReactNode`); `disabled` por `isDisabled`; la etiqueta deja de derivarse de `name` y pasa a `label`.
- Se renombra `input.type.ts` a `input.types.ts` y se añade `input.variants.ts` con los mapas de variantes y tamaños sobre tokens.
- Se actualizan las stories para cubrir variantes, tamaños, label/description/error, slots, password, disabled y los temas light/dark.
- Se agrega `input.test.tsx` como suite de contrato y comportamiento en `jsdom`.
- Fuera de alcance: native/mobile, `TextArea`, OTP/máscaras, composición con `Form`/`Select`, tokens nuevos y cambios en los valores del pipeline.

## Capabilities

### New Capabilities

- `input`: contrato público del campo de texto web — variantes, tamaños, `label`/`description`/`errorMessage`, slots, estados, accesibilidad, reenvío de `ref`, passthrough de props y consumo estricto de tokens `--nerux-*`.

### Modified Capabilities

Ninguna. El input se apoya en `token-pipeline`, `brand-theming` y `theme-runtime` sin cambiar sus requisitos.

## Impact

- `src/components/web/input/input.tsx` — migración del wrapper sobre HeroUI v3.
- `src/components/web/input/input.type.ts` → `input.types.ts` — contrato público tipado.
- `src/components/web/input/input.variants.ts` — nuevo mapa de variantes y tamaños sobre tokens `--nerux-*`.
- `src/components/web/input/input.stories.tsx` — catálogo actualizado de estados, slots y temas.
- `src/components/web/input/input.test.tsx` — nueva suite de contrato, accesibilidad y comportamiento en `jsdom`.
- `src/components/web/input/index.ts` y `src/components/web/index.ts` — exports del componente y de sus tipos.
- `src/index.ts` — `InputNerux` y su contrato quedan disponibles desde la API pública del paquete.
- Consumidores actuales: solo las stories del DS; el cambio es breaking por los renombrados de props.
- Dependencias: `@heroui/react` ya es peer dependency; `@testing-library/react` y `jsdom` ya están disponibles por el change del botón.
