## 1. Preparación

- [ ] 1.1 Confirmar que `@testing-library/react` y `jsdom` siguen en `devDependencies` y que el proyecto `unit` ejecuta `input.test.tsx` con `// @vitest-environment jsdom`.
- [ ] 1.2 Verificar que `@heroui/react` exporta `TextField`, `Label`, `Description`, `FieldError` e `InputGroup` con `Prefix`/`Input`/`Suffix`.
- [ ] 1.3 Confirmar que `src/token/generated/heroui.css` no define `--color-field-border-invalid` ni las variables de estado locales, y anotar los overrides necesarios.

## 2. Tipos y contrato público

- [ ] 2.1 Renombrar `src/components/web/input/input.type.ts` a `input.types.ts` y corregir todos los imports.
- [ ] 2.2 Definir `InputVariant = "primary" | "secondary"` e `InputSize = "sm" | "md" | "lg"`.
- [ ] 2.3 Definir `InputProps` a partir de `ComponentPropsWithRef<typeof HeroTextField>`, omitiendo `variant`, `children`, `className`, `ref` y `size`.
- [ ] 2.4 Agregar `label`, `description`, `errorMessage`, `startContent` y `endContent` como `ReactNode`; `className?: string`; `ref?: Ref<HTMLInputElement>` y `disabled?: never`.
- [ ] 2.5 Eliminar `error`, `startIcon`, `endIcon` y el import de `IconName`; confirmar que ningún archivo sigue importándolos.

## 3. Variantes, tamaños y tokens

- [ ] 3.1 Crear `src/components/web/input/input.variants.ts` con `inputVariantClasses` para `primary` y `secondary`.
- [ ] 3.2 Alimentar `--field-background`, `--field-foreground`, `--field-placeholder`, `--field-border`, `--field-border-hover`, `--field-border-focus`, `--field-focus` y `--field-shadow` con tokens `--nerux-*` por variante.
- [ ] 3.3 Declarar localmente `--border-width-field: var(--nerux-border-width-default)`, `--color-field-border-invalid: var(--nerux-color-danger)` y `--danger: var(--nerux-color-danger)` en el grupo.
- [ ] 3.4 Declarar `--danger: var(--nerux-color-danger-text)` en la raíz `TextField` para etiqueta y mensaje de error.
- [ ] 3.5 Definir `inputSizeClasses` para `sm`, `md` y `lg` con `--nerux-input-height` (`--nerux-spacing-8/9/10`) y `--nerux-input-font` (`--nerux-font-size-sm/md/lg`).
- [ ] 3.6 Verificar que ninguna clase de variante o tamaño referencia `--color-*` legacy ni colores hardcodeados (`#`, `rgb(`, `hsl(`, `oklch(`).

## 4. Componente principal

- [ ] 4.1 Reescribir `src/components/web/input/input.tsx` con la composición `TextField` → `Label` → `InputGroup` (`Prefix`/`Input`/`Suffix`) → `Description` → `FieldError`.
- [ ] 4.2 Aplicar la etiqueta solo desde `label` y generar `fieldId` con `useId()`, respetando un `id` provisto por el consumidor.
- [ ] 4.3 Calcular `isInvalid` efectivo como `isInvalid ?? Boolean(errorMessage)` y pasarlo al `TextField`.
- [ ] 4.4 Renderizar `Description` solo si hay `description` y `FieldError` solo si hay `errorMessage`.
- [ ] 4.5 Combinar `className` con `clsx(inputVariantClasses[variant], inputSizeClasses[size], className)` en la raíz.
- [ ] 4.6 Pasar `value`, `defaultValue`, `onChange`, `placeholder`, `name`, `autoComplete`, `type`, `inputMode`, `pattern`, `maxLength` y eventos al `InputGroup.Input`.
- [ ] 4.7 Purgar `error`, `startIcon`, `endIcon` y `disabled` del objeto de props antes del spread, incluso si llegan por cast.
- [ ] 4.8 Renderizar `startContent` en `InputGroup.Prefix` y `endContent` en `InputGroup.Suffix`, sin nodos vacíos cuando no hay contenido.
- [ ] 4.9 Reenviar `ref` a `InputGroup.Input` y confirmar que resuelve al `<input>` nativo.
- [ ] 4.10 Aplicar defaults `variant="primary"` y `size="md"`.

## 5. Accesibilidad

- [ ] 5.1 Generar `descriptionId` y `errorId` derivados de `fieldId` y asignarlos a `Description`/`FieldError`.
- [ ] 5.2 Pasar `htmlFor={fieldId}` al `Label` e `id={fieldId}` al input.
- [ ] 5.3 Exponer `aria-invalid="true"` en el input cuando el campo sea inválido, y omitirlo cuando no lo sea.
- [ ] 5.4 Componer `aria-describedby` con el valor del consumidor, el id de descripción y el id de error, sin duplicados.
- [ ] 5.5 Propagar `isRequired`, `isDisabled` e `isReadOnly` a la raíz, al input y al `Label` (`isRequired`) según corresponda.
- [ ] 5.6 Confirmar que el anillo de foco sigue resolviéndose desde `--nerux-color-focus` a través de `--focus`.

## 6. Toggle de contraseña

- [ ] 6.1 Agregar estado `isVisible` (default `false`) y calcular el tipo efectivo `password`/`text`; reiniciarlo cuando `type` deje de ser `password`.
- [ ] 6.2 Renderizar el toggle como `Button` de HeroUI `isIconOnly`, `variant="ghost"` y `type="button"`, con `IconEye`/`IconEyeClosed`.
- [ ] 6.3 Exponer `aria-label` alternado (`Mostrar contraseña`/`Ocultar contraseña`), `aria-pressed={isVisible}` y `aria-controls={fieldId}`.
- [ ] 6.4 Sincronizar `isDisabled` del toggle con `isDisabled` del campo, sin deshabilitarlo por `isReadOnly`.
- [ ] 6.5 Colocar el toggle al final del sufijo, después de `endContent`, y no renderizarlo para tipos distintos de `password`.

## 7. Exports

- [ ] 7.1 Actualizar `src/components/web/input/index.ts` para exportar `InputNerux`, `InputProps`, `InputVariant`, `InputSize`, `inputVariantClasses` e `inputSizeClasses`.
- [ ] 7.2 Actualizar `src/components/web/index.ts` para exportar desde `./input` sin duplicar el componente.
- [ ] 7.3 Confirmar que `src/index.ts` sigue exponiendo `InputNerux` y los tipos a través de `components/web`.

## 8. Stories

- [ ] 8.1 Reescribir `src/components/web/input/input.stories.tsx` con la nueva API y `args` tipados.
- [ ] 8.2 Agregar la matriz de `variant` × `size` (2 × 3).
- [ ] 8.3 Agregar stories de `label`, `description`, `errorMessage` e `isInvalid` externo.
- [ ] 8.4 Agregar stories con `startContent` y `endContent` simultáneos.
- [ ] 8.5 Agregar stories de contraseña, `isDisabled`, `isReadOnly`, `isRequired` y `fullWidth`.
- [ ] 8.6 Revisar las stories en light y dark y eliminar cualquier uso de `error`, `startIcon`, `endIcon` o `disabled`.

## 9. Suite de contrato (`input.test.tsx`)

- [ ] 9.1 Crear `src/components/web/input/input.test.tsx` con `// @vitest-environment jsdom`, `afterEach(cleanup)` y helpers de render.
- [ ] 9.2 Tipos: validar `variant`, `size`, `ref` y la ausencia de `error`, `startIcon`, `endIcon` y `disabled` con `expectTypeOf`.
- [ ] 9.3 Tokens: extraer los `var(--…)` de variantes y tamaños, exigir prefijo `--nerux-`, rechazar `--color-*` y colores hardcodeados, y verificar cada token en `semantic.css`/`primitives.css`.
- [ ] 9.4 Ref y passthrough: validar ref de objeto y callback, `value`/`defaultValue`/`placeholder`/`name`/`autoComplete`/`type`/`maxLength`, disparo de `onChange` y `className` en la raíz.
- [ ] 9.5 Accesibilidad: validar `htmlFor`/`id`, `aria-invalid`, `aria-describedby` con y sin error, merge con el consumidor y semántica de required/disabled/readOnly.
- [ ] 9.6 Descripción y error: validar render simultáneo, ausencia de `FieldError` sin `errorMessage` e invalidez externa sin mensaje.
- [ ] 9.7 Slots: validar prefijo → input → sufijo, render simultáneo y ausencia de slots vacíos.
- [ ] 9.8 Contraseña: validar tipo inicial, alternancia, `aria-pressed`, `aria-label`, `aria-controls`, `type="button"` y disabled sincronizado.
- [ ] 9.9 Props obsoletas: inyectar `error`, `startIcon`, `endIcon` y `disabled` por cast y verificar que no llegan al DOM ni alteran el estado.
- [ ] 9.10 Defaults: confirmar `primary` y `md` por comportamiento y las clases de variante/tamaño aplicadas.

## 10. Verificación

- [ ] 10.1 Ejecutar `pnpm test` y confirmar que la suite completa pasa.
- [ ] 10.2 Ejecutar `pnpm lint` sin errores ni warnings nuevos.
- [ ] 10.3 Ejecutar `pnpm build` y verificar que el contrato público se emite correctamente.
- [ ] 10.4 Ejecutar `pnpm tokens:check` y confirmar que no hay artefactos desactualizados.
- [ ] 10.5 Ejecutar `openspec validate --strict add-input-component` y confirmar que el change es válido.
- [ ] 10.6 Revisar en Storybook las 2 variantes y los 3 tamaños en light y dark, con foco, hover, error, disabled, readOnly y contraseña.
- [ ] 10.7 Revisar el diff final y confirmar que no quedan referencias a `--color-*`, `input.type`, `startIcon`, `endIcon`, `error` ni `disabled` fuera de los tests de regresión.
