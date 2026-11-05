## Why

El manejo de textos en las aplicaciones está fragmentado: se usan etiquetas HTML nativas (`p`, `h1`, `span`, `label`) combinadas con clases arbitrarias de Tailwind (por ejemplo `text-lg font-semibold text-(--nerux-color-text-default)`), lo que produce inconsistencias en la escala tipográfica, quiebres en la jerarquía visual, duplicación de código y dificultades para mantener el contraste accesible (WCAG AA) en modo light y dark. Se necesita una primitiva tipográfica unificada (`TextNerux`) que gobierne toda la escala de textos bajo un contrato tipado y tokens centralizados.

## What Changes

- Se crea el componente `TextNerux` en `src/components/web/text/`.
- Superficie pública robusta y tipada:
  - `variant` / `size` (escala semántica): `display`, `h1`, `h2`, `h3`, `h4`, `body-lg`, `body-md` (default), `body-sm`, `caption`, `overline`.
  - `as` (polimorfismo seguro): permite redefinir la etiqueta HTML renderizada (por ejemplo, renderizar un `h2` con estilo de `h3` o un `p` con estilo de `body-sm`), separando la jerarquía visual de la semántica del DOM.
  - `weight`: `regular | medium | semibold | bold`.
  - `color` (tokens semánticos de texto): `default`, `secondary`, `muted`, `success`, `warning`, `danger`, `brand`, `inverse`.
  - `align`: `left | center | right | justify`.
  - Modificadores: `truncate`, `italic`, `uppercase`, `noWrap`.
- Consumo exclusivo de tokens `--nerux-*` para tamaños de fuente, pesos, interlineados y colores de texto. Se prohíben las clases tipográficas de Tailwind sin tokens y los colores hardcodeados.
- Accesibilidad: soporte automático para la jerarquía semántica del DOM y contratos ARIA cuando se requieran, con reenvío de `ref` y passthrough estricto de props.
- Se actualizan las stories de Storybook para cubrir toda la escala tipográfica, pesos, colores y temas (light/dark).
- Se agrega `text.test.tsx` como suite de contrato y comportamiento en `jsdom`.
- **BREAKING**: `TextNerux` reemplaza la implementación existente en `src/components/web/texto/`. La API antigua (`variant: title | subtitle | body | caption | error`, `color: primary | secondary | error | success | warning`) deja de existir y se sustituye por la nueva escala semántica y los nuevos colores; el export del barrel público (`src/components/web/index.ts`) se reemplaza para evitar colisiones. No hay consumidores fuera de las stories del DS.
- Fuera de alcance: componentes de Markdown complejos, editores de texto enriquecido o internacionalización de textos.

## Capabilities

### New Capabilities

- `typography`: contrato público del componente tipográfico web — escalas, polimorfismo, pesos, colores semánticos, reenvío de `ref`, passthrough estricto de props y consumo de tokens `--nerux-*`.

### Modified Capabilities

Ninguna. La tipografía se apoya en `token-pipeline`, `brand-theming` y `theme-runtime` sin cambiar sus requisitos.

## Impact

- `src/components/web/text/text.tsx` — implementación del componente tipográfico polimórfico.
- `src/components/web/text/text.types.ts` — definiciones de tipos (`TextVariant`, `TextWeight`, `TextColor`, `TextProps`).
- `src/components/web/text/text.variants.ts` — mapas de clases y estilos basados en tokens.
- `src/components/web/text/text.stories.tsx` — catálogo visual en Storybook de escala, pesos, colores y temas.
- `src/components/web/text/text.test.tsx` — suite de contrato y comportamiento en `jsdom`.
- `src/components/web/text/index.ts` y `src/components/web/index.ts` — export del componente y de sus tipos; se elimina el export de `./texto/texto`.
- `src/index.ts` — exportación pública de `TextNerux` y sus tipos.
- `src/components/web/texto/` — implementación anterior retirada una vez migrada la story y verificado el barrel.
- Consumidores actuales: solo las stories del DS; el cambio es breaking por la nueva API y la retirada del componente previo.
- Dependencias: sin dependencias nuevas; `@testing-library/react` y `jsdom` ya están disponibles por cambios previos.
