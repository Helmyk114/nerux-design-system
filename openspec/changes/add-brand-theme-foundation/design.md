## Context

El DS envuelve componentes de HeroUI v3 y ya tiene una primera capa de tokens, pero el theming es parcial:

- `src/token/colors.css` define ~16 variables y `src/token/heroui-theme.css` mapea solo un subconjunto de las variables de HeroUI.
- `src/token/types.ts` declara tokens que no existen y omite tokens reales.
- No existe Provider, hook, persistencia ni estrategia SSR; el tema se aplica con `data-theme` desde Storybook o manualmente.
- Los componentes consumen variables sin prefijo (`--color-*`, `--spacing-*`), lo que puede colisionar con las apps consumidoras.
- El build publica ES/CJS, `.d.ts` y un CSS único; la API pública se exporta desde `src/index.ts`.

Restricciones: mantener funcionando los 11 componentes y a los consumidores actuales; no refactorizar componentes en este cambio; soportar apps internas y consumo npm; soportar SSR.

## Goals / Non-Goals

**Goals:**

- Fuente única de tokens TS con generación determinista de CSS.
- Contrato de variables namespaced (`--nerux-*`) con aliases para los nombres actuales.
- Paleta semántica completa light/dark y nueva paleta Nerux.
- Multi-marca por `data-brand` con `nerux` por defecto.
- Personalización acotada: color primario (uno solo), logos light/dark y favicon por URL.
- Derivación de la escala de marca 100 % nativa en CSS con `oklch()` y `color-mix()`, sin lógica de color en JavaScript.
- Provider/hook con `light | dark | system`, persistencia y snippet SSR inline sin FOUC.
- Validación automática de contraste AA y de cobertura de tokens.

**Non-Goals:**

- Refactor de componentes, componentes nuevos o mobile.
- Multi-marca simultánea en la misma página (una marca por documento).
- Alto contraste.
- Cambiar el pipeline de publicación o externalizar dependencias.
- Editor visual de temas.

## Decisions

### 1. Fuente de tokens en TypeScript, CSS generado

Los tokens viven en módulos TS tipados (`src/token/source/*.ts`) y un script de build genera los CSS en `src/token/generated/`. El script se ejecuta antes de `build` y en CI con modo `--check`.

- **Por qué:** permite tipos, validación y tests de contraste sin añadir un DSL ni una dependencia pesada.
- **Alternativas:** JSON + generador (pierde tipos en origen); Style Dictionary (potente pero sobredimensionado para este alcance); CSS a mano (mantiene el problema actual).

### 2. Variables namespaced con aliases legacy

El contrato canónico usa `--nerux-color-*`, `--nerux-spacing-*`, `--nerux-radius-*`, `--nerux-shadow-*`, `--nerux-font-*`, `--nerux-transition-*` y `--nerux-brand-*`. Los nombres actuales (`--color-*`, `--spacing-*`, `--border-radius-*`, etc.) se emiten como aliases deprecated que apuntan a los nuevos.

- **Por qué:** evita colisiones en apps consumidoras y permite refactorizar componentes después sin romper nada.
- **Alternativas:** conservar los nombres actuales (colisiones y deuda); renombrar sin aliases (breaking innecesario).

### 3. Capas de tokens: primitivo → semántico → componente

Los primitivos (rampas de color, escalas) solo alimentan semánticos; los componentes consumen exclusivamente semánticos. La marca Nerux se define como un conjunto de semánticos por tema.

- **Por qué:** la personalización por marca se limita a los semánticos de marca y no obliga a recalcular toda la paleta.
- **Alternativas:** tokens planos (difíciles de derivar y mantener).

### 4. Multi-marca por atributo en la raíz

La marca activa se selecciona con `[data-brand="<slug>"]` en `:root`. La marca por defecto es `nerux` y un slug desconocido cae en Nerux con advertencia en desarrollo. El Provider escribe el atributo; el modo estático puede hacerlo por HTML.

- **Por qué:** cumple “una app, una marca” sin el coste de scoping por subárbol.
- **Alternativas:** `data-brand` por contenedor (complejidad de herencia y portales); CSS modules por marca (peor DX).

### 5. Derivación de escala de marca 100 % nativa en CSS

El Provider no calcula colores. Recibe un único color primario y lo expone como custom property base (`--nerux-brand-base`), junto con las URLs de assets. El CSS deriva el resto de la escala con `oklch()` —incluida la sintaxis de color relativo— y `color-mix()`:

- **Hover:** `color-mix(in oklch, var(--nerux-brand-base) 88%, white)` en light y la mezcla equivalente hacia `black` en dark.
- **Active:** mezcla al 78 % hacia el extremo correspondiente al tema.
- **Focus-ring:** `oklch(from var(--nerux-brand-base) l c h / 0.45)`.
- **Foreground accesible:** `contrast-color(var(--nerux-brand-base))` para elegir blanco o negro con mayor contraste; fallback a un par de foreground prevalidado para motores sin soporte.

La validación WCAG AA se mantiene en build y tests para la paleta Nerux y la marca de ejemplo; en runtime no se ejecuta matemática de color en JavaScript.

- **Por qué:** cero JavaScript de color, sin dependencias, mismo resultado en cualquier app, cambios de marca instantáneos y cacheables, y bundle sin sobrecoste.
- **Alternativas:** cálculo JS inline en el Provider (coste de runtime y bundle, y riesgo de desajuste entre SSR y cliente); `colorjs.io`/`culori` (peso y dependencia innecesarios); exigir la escala completa al consumidor (peor DX y más superficie de error).

### 6. Tema en React con persistencia y SSR seguro

`NeruxProvider` mantiene `theme` (preferencia) y `resolvedTheme` (light/dark). En cliente lee `localStorage` y `matchMedia` dentro de efectos, nunca durante el render inicial. Para SSR se exporta un script inline sincrónico (`getThemeScript`) que aplica `data-theme`/`data-brand` antes del primer pintado; el consumidor lo inserta en el `<head>`.

- **Por qué:** evita desajustes de hidratación y el FOUC sin imponer un framework.
- **Alternativas:** leer storage en render (hydration mismatch); cookie en servidor (requiere integración del framework).

### 7. Assets como URLs, variables CSS y aplicación pre-hidratación

El logo light/dark y el favicon se reciben como URLs. Los logos se exponen como `--nerux-brand-logo-light` / `--nerux-brand-logo-dark` (valores `url("...")`); el favicon se aplica actualizando `<link rel="icon">`.

La aplicación inicial de assets y variables forma parte del script SSR inline (`getThemeScript`), que corre antes de la hidratación. Después, los helpers del `NeruxProvider` actualizan de forma idempotente solo cuando cambia la configuración de marca, en un efecto posterior al commit. El Provider no escribe en el DOM durante el render ni durante la hidratación.

- **Por qué:** el primer pintado ya tiene tema, marca, logos y favicon correctos; se evita manipulación imperativa durante la hidratación y los avisos de mismatch.
- **Alternativas:** manipular `<link>` y variables directamente en el render (rompe la hidratación); dejar los assets solo a CSS (no permite favicon); exigir al consumidor inyectar el favicon a mano (peor DX).

### 8. Storybook como banco de pruebas

La toolbar de Storybook añade selector de marca además del de tema. Un decorador aplica ambos atributos. Se añade una story de personalización con una marca de ejemplo y una story de tokens/contraste.

- **Por qué:** valida la matriz tema × marca sin crear una app aparte.
- **Alternativas:** demo app separada (más mantenimiento).

### 9. Versionado

El cambio se publica como **2.0.0**: la API es aditiva y los aliases evitan romper CSS, pero la nueva paleta Nerux cambia la apariencia por defecto, lo que es un cambio visual breaking para un DS.

- **Por qué:** comunica correctamente el impacto visual.
- **Alternativas:** 1.1.0 (oculta el impacto visual).

## Risks / Trade-offs

- **Cobertura incompleta de variables de HeroUI** → auditar todas las variables del tema de HeroUI v3 y añadir una prueba visual en Storybook para light/dark.
- **Colisiones o aliases mal resueltos** → test que verifique que cada alias resuelve al token canónico `--nerux-*` y que no quedan variables sin definir.
- **Hidratación distinta entre servidor y cliente** → el render inicial no lee storage ni escribe en el DOM; el script pre-paint es la única fuente temprana y los helpers posteriores son idempotentes.
- **Soporte de `oklch()`, `color-mix()` y `contrast-color()`** → fijar el baseline de navegadores de 2026, usar `contrast-color()` con fallback prevalidado y cubrir la matriz en pruebas visuales.
- **Derivación CSS con resultados pobres en casos límite** → tests con colores claros, oscuros, saturados y grises; si no se alcanza AA, el consumidor recibe un aviso y se mantiene la marca Nerux.
- **Cero coste de color en JS** → el Provider no incluye matemática de color, solo aplica la variable base y los assets; sigue siendo tree-shakeable y opcional.
- **Duplicación de `<link rel="icon">` o variables de assets** → helpers idempotentes y test de que el script y el Provider no aplican dos veces el mismo asset.
- **Cambio visual inesperado en consumidores** → publicar 2.0.0, changelog con capturas y guía de migración; aliases para CSS.
- **Tokens generados desincronizados** → `tokens:check` en CI y generación en `prebuild`.

## Migration Plan

1. Añadir la fuente de tokens y el generador; conservar los CSS actuales como aliases.
2. Completar semánticos, mapeo HeroUI y paleta Nerux; validar contraste.
3. Publicar el Provider, hook, script SSR y tipos de marca.
4. Integrar Storybook (tema × marca) y documentar la API.
5. Verificar que los 11 componentes siguen renderizando con los aliases.
6. Publicar 2.0.0 con changelog y guía de migración.

Rollback: revertir a la versión anterior del paquete. Los aliases permiten que una app vuelva a los nombres antiguos sin cambios de código.

## Open Questions

- Valores finales de la nueva paleta Nerux: se propondrán en implementación y requerirán revisión de marca antes de publicar.
- ¿Se querrá en el futuro un color de marca distinto por tema? La API actual acepta uno solo; el diseño permite añadirlo después sin romper.
- ¿Se adoptará SSR en alguna app real a corto plazo? El soporte se implementa igualmente, pero condiciona las pruebas de integración.
