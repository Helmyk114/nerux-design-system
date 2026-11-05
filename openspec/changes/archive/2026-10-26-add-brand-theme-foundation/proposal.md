## Why

El design system ya envuelve 11 familias de componentes de HeroUI v3, pero su theming es ad-hoc: los tokens semánticos están incompletos, no existe una API de tema ni una forma controlada de que otra aplicación aplique su marca. Esto bloquea el objetivo de un DS con marca Nerux en light/dark y personalizable por consumidores.

Además, el theming moderno de 2026 exige que la personalización se resuelva con capacidades nativas de CSS —`oklch()`, `color-mix()` y variables CSS— para evitar lógica de color en JavaScript, reducir el coste en runtime y mantener consistencia visual entre aplicaciones.

## What Changes

- Definir una fuente única de verdad de tokens en TypeScript/JSON que genere variables CSS nativas con prefijo `var(--nerux-*)`, con paleta semántica completa para light y dark y una nueva paleta de marca Nerux.
- Exponer los tokens generados como variables CSS nativas compatibles con HeroUI v3 y con la capa de utilidades de Tailwind CSS, sin requerir reconfiguraciones complejas del build en las aplicaciones consumidoras.
- Completar el mapeo de variables de HeroUI para que los componentes hereden la marca sin estilos hardcodeados.
- Introducir multi-marca mediante `data-brand`, con `nerux` como marca por defecto y una superficie de personalización acotada para consumidores: color primario, logos light/dark y favicon.
- Añadir `NeruxProvider` + `useNeruxTheme` con modos `light`, `dark` y `system`, persistencia de preferencia y soporte SSR sin FOUC.
- Permitir que un consumidor defina su marca con un solo color. La derivación de la escala de marca (hover, active, focus-ring y foreground con contraste WCAG AA) se realizará de forma nativa en CSS mediante el espacio de color `oklch()` y la función `color-mix()`, sin dependencias de JavaScript en runtime, garantizando rendimiento y consistencia visual.
- Exponer desde `NeruxProvider` un snippet o script inline sincrónico para inyectar en el `<head>` del documento en entornos SSR (Next.js/Remix). Ese script leerá la preferencia de `localStorage` y aplicará `data-theme` y `data-brand` antes de la hidratación y del primer pintado, evitando el FOUC.
- Aceptar logos y favicon como URLs.
- Mantener aliases deprecated para los tokens renombrados, de modo que los componentes y consumidores actuales sigan funcionando.
- Añadir documentación y un playground de marca/tema en Storybook.

**Fuera de alcance:** refactor de los componentes existentes, componentes nuevos, componentes mobile y cambios en la estrategia de distribución/publicación.

## Capabilities

### New Capabilities
- `token-pipeline`: fuente única de tokens, generación de variables CSS nativas `var(--nerux-*)` compatibles con HeroUI v3 y Tailwind, paleta semántica light/dark, paleta Nerux, aliases deprecated y validación de contraste.
- `brand-theming`: modelo multi-marca por `data-brand`, marca Nerux por defecto, personalización de color primario, logos y favicon, y derivación de la escala de marca 100 % en CSS con `oklch()` y `color-mix()`, sin JavaScript en runtime.
- `theme-runtime`: Provider y hook de tema con light/dark/system, persistencia, snippet inline SSR anti-FOUC y aplicación del tema/marca al documento antes de la hidratación.

### Modified Capabilities

Ninguna: `openspec/specs/` no contiene capacidades existentes.

## Impact

- **Código:** `src/token/*` (nuevo pipeline y tokens generados), `src/index.ts` (exports públicos), nuevo módulo de theming/provider, `.storybook/preview.tsx` y stories de demostración.
- **API pública:** nuevas exportaciones `NeruxProvider`, `useNeruxTheme`, el snippet SSR anti-FOUC y tipos de configuración de marca; tokens `--nerux-*` con aliases deprecated.
- **Dependencias:** sin dependencias de JavaScript en runtime para derivar color; la lógica de color vive en CSS nativo. Solo se prevén utilidades de build para generar tokens y validar contraste.
- **Consumidores:** las apps internas y consumidores npm actuales siguen funcionando; no necesitan reconfigurar su build para consumir los tokens y adoptar una marca propia es optativo.
