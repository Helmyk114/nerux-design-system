## 1. Auditoría y preparación

- [ ] 1.1 Inventariar todos los tokens actuales en `src/token/*.css` y los tokens declarados en `src/token/types.ts`.
- [ ] 1.2 Inventariar los tokens realmente consumidos por los 11 componentes y detectar los que faltan o no existen.
- [ ] 1.3 Auditar las variables de tema de HeroUI v3 y listar las que el DS debe mapear.
- [ ] 1.4 Definir el mapa de renombres `--color-*`/`--spacing-*`/etc. → `--nerux-*` y sus aliases deprecated.
- [ ] 1.5 Añadir scripts `tokens:build`, `tokens:check`, `test` (`vitest run`) y `test:coverage` al `package.json`, y ejecutar la generación en `prebuild`.
- [ ] 1.6 Cambiar la configuración de a11y de `"todo"` a `"error"` en `.storybook/preview.tsx`.
- [ ] 1.7 Verificar que `pnpm test` ejecuta las stories como pruebas y falla si una story o una comprobación de a11y falla.

## 2. Fuente única de tokens

- [ ] 2.1 Crear la estructura `src/token/source/` con los tipos de token, tema y marca.
- [ ] 2.2 Definir los tokens primitivos (rampas de color y escalas base).
- [ ] 2.3 Definir los tokens semánticos completos para `light` y `dark` (marca, success, warning, danger, info, superficies, bordes, texto y estados).
- [ ] 2.4 Proponer y definir la nueva paleta de marca Nerux (primario, hover, active, disabled, focus y foreground) para ambos temas.
- [ ] 2.5 Implementar el generador determinista de CSS a partir de la fuente.
- [ ] 2.6 Emitir los aliases legacy apuntando a los tokens canónicos `--nerux-*`.
- [ ] 2.7 Generar o derivar los tipos públicos de tokens desde la misma fuente.
- [ ] 2.8 Añadir tests de generación determinista, cobertura por tema y ausencia de tokens huérfanos.

## 3. Contraste y accesibilidad de color

- [ ] 3.1 Implementar utilidades de color de build/test (parseo hex, luminancia relativa y ratio WCAG) para validar contraste, sin lógica de color en runtime.
- [ ] 3.2 Validar automáticamente todos los pares expuestos texto/fondo y texto/marca.
- [ ] 3.3 Añadir tests con colores claros, oscuros, saturados, grises y casos límite.
- [ ] 3.4 Integrar la validación de contraste en el script `tokens:check` y en CI.

## 4. Mapeo de HeroUI

- [ ] 4.1 Mapear el conjunto completo de variables de HeroUI a los tokens semánticos del DS en light y dark.
- [ ] 4.2 Verificar visualmente los componentes HeroUI sin overrides en ambos temas.
- [ ] 4.3 Añadir una story de verificación visual de tokens y tema.

## 5. Modelo de marca

- [ ] 5.1 Definir los bloques CSS de marca `[data-brand="nerux"]` y la resolución de marca por defecto.
- [ ] 5.2 Implementar validación de marca desconocida con fallback a Nerux y advertencia en desarrollo.
- [ ] 5.3 Implementar la derivación de hover, active, disabled y focus desde un único color primario.
- [ ] 5.4 Implementar la selección automática del foreground con mayor contraste y garantía AA.
- [ ] 5.5 Exponer logo light, logo dark y favicon como URLs mediante variables CSS y actualización del `<link rel="icon">` de forma segura e idempotente (mediante script SSR y efectos posteriores a la hidratación para evitar conflictos de DOM).
- [ ] 5.6 Añadir tests de derivación de escala, fallback y contraste de marcas personalizadas.

## 6. Runtime de tema y marca

- [ ] 6.1 Crear el contexto y la API pública de `NeruxProvider` con configuración de tema y marca.
- [ ] 6.2 Implementar `theme`, `resolvedTheme`, modo `system` y escucha de `prefers-color-scheme`.
- [ ] 6.3 Implementar persistencia configurable en `localStorage` con descarte de valores inválidos.
- [ ] 6.4 Implementar `useNeruxTheme` con error explícito fuera del Provider.
- [ ] 6.5 Aplicar `data-theme` y `data-brand` al elemento raíz configurable.
- [ ] 6.6 Aplicar la configuración de marca en runtime escribiendo las variables CSS correspondientes.
- [ ] 6.7 Implementar `getThemeScript` para aplicar tema y marca antes del primer pintado.
- [ ] 6.8 Añadir tests de SSR, hidratación, ausencia de storage y cambio de tema/marca.
- [ ] 6.9 Exportar Provider, hook, script y tipos desde `src/index.ts`.

## 7. Storybook y documentación

- [ ] 7.1 Añadir el selector de marca a la toolbar de Storybook junto al de tema.
- [ ] 7.2 Actualizar el decorador para aplicar `data-theme` y `data-brand` en la matriz tema × marca.
- [ ] 7.3 Crear una story de personalización con una marca de ejemplo (color, logos y favicon).
- [ ] 7.4 Documentar la API de tokens, Provider, hook, SSR y personalización.
- [ ] 7.5 Añadir changelog y guía de migración para consumidores (aliases y cambio visual).

## 8. Verificación y release

- [ ] 8.1 Verificar que los 11 componentes existentes renderizan correctamente usando los aliases legacy.
- [ ] 8.2 Ejecutar `pnpm build`, `pnpm lint` y la suite de tests sin errores.
- [ ] 8.3 Ejecutar `pnpm build-storybook` y revisar la matriz tema × marca.
- [ ] 8.4 Crear un workflow de CI que ejecute `pnpm lint`, `pnpm build`, `pnpm test` y `pnpm build-storybook` en pull requests y en `master`.
- [ ] 8.5 Configurar ese workflow como gate obligatorio para merge y para publicar.
- [ ] 8.6 Actualizar la versión a `2.0.0` y preparar las notas de release.
- [ ] 8.7 Documentar el procedimiento de rollback a la versión anterior.
