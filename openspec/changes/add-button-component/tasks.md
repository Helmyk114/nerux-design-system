## 1. Dependencias y entorno de pruebas

- [x] 1.1 Agregar `@testing-library/react` y `jsdom` a `devDependencies` en `package.json`.
- [x] 1.2 Instalar dependencias, actualizar `pnpm-lock.yaml` y verificar que `jsdom` resuelve desde el proyecto `unit`.
- [x] 1.3 Confirmar que `vite.config.ts` no requiere cambios: el proyecto `unit` sigue en `node` y el test de componente declara `// @vitest-environment jsdom` por archivo.

## 2. Tipos y variantes

- [x] 2.1 Reescribir `src/components/web/button/button.types.ts` con `ButtonVariant` (7 valores), `ButtonSize` (3 valores) y `ButtonProps` basado en `ComponentPropsWithRef<typeof HeroButton>`.
- [x] 2.2 Omitir `variant`, `size`, `children`, `isPending`, `color` y `render` del tipo de HeroUI; agregar `isLoading`, `startContent`, `endContent` y `children: ReactNode`.
- [x] 2.3 Eliminar `ButtonColor` y el import de `IconName`; confirmar que ningún archivo sigue importándolos.
- [x] 2.4 Renombrar `button.varaint.ts` a `button.variants.ts` y corregir todos los imports.
- [x] 2.5 Definir `buttonColorVariants` con las clases de propiedad arbitraria que alimentan `--button-bg`, `--button-bg-hover`, `--button-bg-pressed` y `--button-fg` desde tokens `--nerux-*` para las 7 variantes.
- [x] 2.6 Agregar el borde de `outline` con `--nerux-color-border-default` y las mezclas `color-mix` de `danger`/`danger-soft` con `--nerux-color-text-default`.

## 3. Componente

- [x] 3.1 Reescribir `src/components/web/button/button.tsx` como wrapper de `Button` de HeroUI con defaults `variant="primary"`, `size="md"` y `type="button"`.
- [x] 3.2 Descartar en runtime `href`, `target`, `rel`, `download`, `hrefLang`, `ping`, `referrerPolicy` y `render` antes del spread hacia HeroUI.
- [x] 3.3 Reenviar `ref` al `<button>` y propagar `aria-*`, `data-*`, `onPress`, `className`, `fullWidth` e `isIconOnly`.
- [x] 3.4 Combinar `className` con `clsx(buttonColorVariants[variant], className)` sin perder las clases de tokens.
- [x] 3.5 Implementar `isLoading`: pasar `isPending`, exponer `aria-busy="true"`, renderizar `Spinner size="sm" color="current"` y sustituir `startContent`.
- [x] 3.6 Renderizar `startContent`, `children` y `endContent` en ese orden, sin wrappers adicionales.
- [x] 3.7 Actualizar `src/components/web/button/index.ts` para exportar `ButtonNerux`, `ButtonProps`, `ButtonVariant`, `ButtonSize` y `buttonColorVariants`.
- [x] 3.8 Confirmar que `src/components/web/index.ts` mantiene el export público `ButtonNerux` y que no quedan imports a `button.varaint`.

## 4. Stories

- [x] 4.1 Renombrar `button.stories.ts` a `button.stories.tsx` y corregir imports y tipos.
- [x] 4.2 Agregar la matriz de las 7 variantes.
- [x] 4.3 Agregar la story de los 3 tamaños.
- [x] 4.4 Agregar stories de `isLoading` e `isDisabled`.
- [x] 4.5 Agregar story con `startContent` y `endContent` simultáneos y otra con `fullWidth`.
- [x] 4.6 Agregar story icon-only con `aria-label` obligatorio.
- [x] 4.7 Revisar las stories en light y dark y eliminar cualquier uso de `color`, `startIcon` o `endIcon`.

## 5. Suite de contrato (`button.test.tsx`)

- [x] 5.1 Crear `src/components/web/button/button.test.tsx` con `// @vitest-environment jsdom`, `afterEach(cleanup)` y helpers de render.
- [x] 5.2 Tokens: extraer los `var(--…)` del `className`, exigir que todos empiecen con `--nerux-`, rechazar `--color-*` legacy y verificar que cada token existe en `src/token/generated/semantic.css`.
- [x] 5.3 Navegación: comprobar que siempre se renderiza `<button>`, que `href` inyectado por cast no llega al DOM y que `href`/`render` no existen en `ButtonProps` con `expectTypeOf`.
- [x] 5.4 Ref y passthrough: validar ref de objeto y de callback, `aria-label`, `className` combinado, `type="button"` por defecto y disparo de `onPress`.
- [x] 5.5 Carga: validar `aria-busy`, `data-pending`, un único `[data-slot="spinner"]`, click bloqueado, `startContent` sustituido, `endContent` conservado y ausencia de spinner/`aria-busy` sin `isLoading`.
- [x] 5.6 Slots: validar render simultáneo, orden start → children → end y el caso sin slots.
- [x] 5.7 Accesibilidad: validar nombre accesible, activación con Enter/Espacio y que `isDisabled` no se pueda activar.
- [x] 5.8 Contraste: registrar el par sólido de `danger` en `contrastPairs` si falta y ejecutar `validateContrast()`.

## 6. Verificación y OpenSpec

- [x] 6.1 Ejecutar `pnpm test` y confirmar que la suite completa pasa.
- [x] 6.2 Ejecutar `pnpm lint` sin errores ni warnings nuevos.
- [x] 6.3 Ejecutar `pnpm build` y verificar que los tipos generados incluyen el nuevo contrato.
- [x] 6.4 Ejecutar `pnpm tokens:check` y confirmar que no hay artefactos desactualizados.
- [x] 6.5 Ejecutar `openspec validate --strict add-button-component` y confirmar que el change es válido.
- [x] 6.6 Revisar en Storybook las 7 variantes en light y dark, con foco, hover, loading y slots.
- [x] 6.7 Revisar el diff final y confirmar que no quedan referencias a `--color-*`, `button.varaint`, `startIcon`, `endIcon` ni `color` fuera de los tests de regresión.
