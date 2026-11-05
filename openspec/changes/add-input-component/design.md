# Design: InputNerux

## Context

`InputNerux` vive en `src/components/web/input/` y hoy es un wrapper parcial sobre `TextField`/`InputGroup` de HeroUI v3:

- Deriva la etiqueta directamente de `name` (`<Label>{props.name}</Label>`), por lo que no hay forma de mostrar un texto distinto ni de omitir la etiqueta.
- Solo modela el error con `error: string`; el estado inválido, el mensaje y la asociación accesible dependen de un único booleano.
- Expone `startIcon`/`endIcon` como `IconName` del DS, no como contenido libre, y no acepta `description`.
- No reenvía `ref` al `<input>` ni hace passthrough de la mayoría de props nativas: solo reenvía `placeholder`, `value` y `onChange`.
- Mezcla tokens legacy `--color-*` (`--color-border-default`, `--color-primary-bg-default`, `--color-error*`) con `--nerux-*`, y usa `--border-width-thin` (0.2px) como ancho de borde.
- Duplica el control de visibilidad de contraseña con estado local, pero sin `aria-pressed`, sin `type="button"` explícito y sin deshabilitarse cuando el campo está deshabilitado.
- No tiene suite de componente.

Restricciones que gobiernan el diseño:

- El DS es web-only en este change; native/mobile queda fuera.
- La fuente de verdad de color es `src/token/source/semantic.ts`; las variables generadas usan el namespace `--nerux-*`.
- `@heroui/react` v3 ya es peer dependency y `@heroui/styles` expone `TextField`, `Label`, `Description`, `FieldError`, `InputGroup` (`Prefix`/`Input`/`Suffix`).
- `Input`/`InputGroup` de HeroUI solo declaran las variantes `primary | secondary` y `fullWidth`; **no existe** una prop `size`. Los tamaños `sm | md | lg` son responsabilidad del DS.
- La paleta semántica `success`, `warning`, `danger` e `info` es la única fuente de color de estado; no se admiten `--color-*` legacy ni colores hardcodeados.
- El proyecto `unit` de Vitest corre en `environment: "node"`; los tests de DOM usan el docblock `// @vitest-environment jsdom` por archivo, como ya hace `button.test.tsx`.

Hallazgos relevantes durante el diseño:

1. **Las variables de estado de HeroUI se resuelven en `:root`.** `--field-border-hover`, `--field-border-focus` y `--field-focus` están definidas en el tema como `color-mix(...)`/`var(--field-background)` evaluadas en el elemento raíz. Sobrescribir solo `--field-border` o `--field-background` en el componente **no** re-deriva esos estados; hay que declarar cada variable localmente.
2. **`--color-field-border-invalid` no existe en `src/token/generated/heroui.css`.** El CSS de `.input-group[data-invalid]` la referencia para el borde, así que sin un valor local el borde inválido no se pinta.
3. **`.input-group` fuerza `--border-width-field: 0px`** en el tema por defecto. El borde del DS necesita redefinir esa variable localmente.
4. **`.textfield[data-invalid] [data-slot="description"]` oculta la descripción** cuando el campo es inválido; el mensaje de error toma prioridad visual.
5. **`.field-error` y `.label--invalid` usan `var(--danger)`**, mientras que el anillo inválido del grupo también usa `--danger` pero necesita el color sólido, no el tono de texto.
6. **React Aria `TextField` omite `description` y `errorMessage` de sus props**: la descripción y el error se componen como hijos (`Description`/`FieldError`) y la asociación ARIA se resuelve por ids.

## Goals / Non-Goals

**Goals:**

- Contrato público tipado y estable para el campo de texto web, definido por la capability `input`.
- Composición sobre HeroUI v3 sin reimplementar markup, foco ni teclado.
- Superficie: `variant` (`primary | secondary`), `size` (`sm | md | lg`), `label`, `description`, `errorMessage`, `startContent`, `endContent`.
- `ref` real al `<input>`, passthrough de props nativas/HeroUI y `className` en la raíz.
- Accesibilidad verificable: `label`/`id`, `aria-invalid` automático, `aria-describedby` para descripción y error, semántica de requerido/deshabilitado/solo lectura.
- Consumo trazable y exclusivo de `--nerux-*` en todas las clases del componente.
- Contraseña con toggle de visibilidad accesible y coherente con el estado del campo.
- Suite de contrato en jsdom y stories actualizadas.

**Non-Goals:**

- Native/mobile, `TextArea`, `InputOTP`, máscaras o inputs numéricos.
- Composición con `Form`, `Select`, `Autocomplete` o validación de formularios completa.
- Nuevos tokens o cambios en los valores del pipeline.
- Un `size` a nivel de HeroUI: los tamaños se implementan en la capa del DS.
- Codemod para consumidores externos; el breaking change se documenta.

## Decisions

### D1. Composición sobre primitivas de HeroUI v3

`InputNerux` renderiza:

```tsx
<TextField variant={variant} isInvalid={isInvalid} ...>
  {label ? <Label htmlFor={fieldId}>{label}</Label> : null}
  <InputGroup>
    {startContent ? <InputGroup.Prefix>{startContent}</InputGroup.Prefix> : null}
    <InputGroup.Input id={fieldId} ... />
    {suffix ? <InputGroup.Suffix>{suffix}</InputGroup.Suffix> : null}
  </InputGroup>
  {description ? <Description id={descriptionId}>{description}</Description> : null}
  {errorMessage ? <FieldError id={errorId}>{errorMessage}</FieldError> : null}
</TextField>
```

No se copia markup ni se reimplementan foco, teclado, autofill o estados: React Aria ya resuelve `focus-within`, `data-invalid`, `data-disabled` y la semántica del campo. La capa del DS solo aporta contrato, tokens, tamaños y accesibilidad adicional.

Alternativas descartadas:

- Reimplementar el input con `<input>` + divs: pierde el comportamiento de React Aria y multiplica los casos de estado.
- Usar solo `Input` de HeroUI (sin `InputGroup`): impide slots laterales y deja el toggle de contraseña fuera del campo.
- Usar `InputGroup.Input` como raíz: no hay contexto de `TextField`, por lo que se pierden label, descripción y error.

### D2. Contrato de tipos

```ts
type HeroTextFieldProps = ComponentPropsWithRef<typeof HeroTextField>;

export type InputVariant = "primary" | "secondary";
export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<
    HeroTextFieldProps,
    "variant" | "children" | "className" | "ref" | "size"
  > {
  variant?: InputVariant;
  size?: InputSize;
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  startContent?: ReactNode;
  endContent?: ReactNode;
  className?: string;
  ref?: Ref<HTMLInputElement>;
  disabled?: never;
}
```

Decisiones puntuales:

- `ref` se sobrescribe a `Ref<HTMLInputElement>`: el `ref` de HeroUI apunta a la raíz `TextField`, no al `<input>`.
- `disabled` se declara `never`: la única API es `isDisabled`, y en runtime se descarta incluso si llega por cast.
- `className` se estrecha a `string` y se aplica a la raíz (`TextField`), no al `<input>`; así el consumidor controla layout sin romper la estructura interna.
- `children` se omite: el contenido del input lo define el wrapper; los slots son la API de composición.
- `errorMessage` se declara como `ReactNode` propio porque `TextField` de React Aria no lo expone como prop.
- `isInvalid` se conserva del passthrough: permite validación externa sin `errorMessage`. El valor efectivo es `isInvalid ?? Boolean(errorMessage)`.
- `label` es opcional y explícita; **nunca** se deriva de `name`.
- Se conserva el nombre exportado `InputNerux`.

### D3. Puente de color: variables locales de HeroUI alimentadas por `--nerux-*`

HeroUI resuelve cada estado del campo leyendo variables locales en `.input-group`/`.input`:

```
--field-background  --field-foreground  --field-placeholder
--field-border      --field-border-hover  --field-border-focus
--field-focus       --field-shadow
--color-field-border-invalid
--danger
```

El DS las alimenta con tokens `--nerux-*` mediante clases de propiedad arbitraria. No se reemplazan las reglas de HeroUI: se reemplazan sus valores, de modo que hover, foco, inválido y deshabilitado siguen resolviéndose en su CSS.

| Variable | `primary` | `secondary` |
|---|---|---|
| `--field-background` | `--nerux-color-surface-default` | `--nerux-color-surface-secondary` |
| `--field-foreground` | `--nerux-color-text-default` | `--nerux-color-text-default` |
| `--field-placeholder` | `--nerux-color-text-secondary` | `--nerux-color-text-secondary` |
| `--field-border` | `--nerux-color-border-default` | `--nerux-color-border-default` |
| `--field-border-hover` | `--nerux-color-border-hover` | `--nerux-color-border-hover` |
| `--field-border-focus` | `--nerux-color-border-focus` | `--nerux-color-border-focus` |
| `--field-focus` | `--nerux-color-surface-default` | `--nerux-color-surface-secondary` |
| `--field-shadow` | `--nerux-shadow-sm` | `none` |
| `--border-width-field` | `--nerux-border-width-default` | `--nerux-border-width-default` |

Decisiones puntuales:

- `--field-border-hover`, `--field-border-focus` y `--field-focus` se declaran explícitamente porque, al resolverse en `:root`, no se re-derivan de los overrides locales.
- `--border-width-field` se fija a `--nerux-border-width-default` (1px). El tema de HeroUI lo deja en `0px`; sin este override el campo no tiene borde.
- `--color-field-border-invalid: var(--nerux-color-danger)` se declara localmente para que el borde inválido exista.
- `--danger: var(--nerux-color-danger)` se declara en el `InputGroup` para que el anillo inválido use el color sólido.
- La raíz `TextField` declara `--danger: var(--nerux-color-danger-text)`; el `Label` inválido y el `FieldError` heredan el tono de texto, mientras el grupo lo sobreescribe para el anillo. Así un solo token de peligro alimenta dos roles distintos sin duplicar clases.
- El anillo de foco no se redefine: HeroUI usa `--focus`, ya mapeado a `--nerux-color-focus` en `src/token/generated/heroui.css`.
- `secondary` reutiliza `--nerux-color-surface-secondary` y `--nerux-color-surface-hover`; no se inventan tokens nuevos.

Alternativas descartadas:

- Clases completas propias (`bg-*`, `border-*`, `hover:bg-*`, `focus:ring-*`): compiten con la máquina de estados de HeroUI, se desincronizan con el autofill y duplican reglas.
- Confiar en las variantes `primary`/`secondary` de HeroUI: no hay rastro de `--nerux-*` en el componente y el inválido queda sin borde.

### D4. Tamaños `sm | md | lg`

HeroUI no expone `size`, así que el DS define variables locales por tamaño y las consume en clases base:

| Tamaño | `--nerux-input-height` | `--nerux-input-font` |
|---|---|---|
| `sm` | `--nerux-spacing-8` (2rem / 32px) | `--nerux-font-size-sm` (13px) |
| `md` | `--nerux-spacing-9` (2.25rem / 36px) | `--nerux-font-size-md` (14px) |
| `lg` | `--nerux-spacing-10` (2.5rem / 40px) | `--nerux-font-size-lg` (16px) |

Las variables se declaran en el `InputGroup` y se consumen con:

- `[min-height:var(--nerux-input-height)]` en el grupo.
- `[font-size:var(--nerux-input-font)]` en `InputGroup.Input`, porque el input de HeroUI fija `text-base sm:text-sm` y ganaría el tamaño propio.

El padding horizontal queda en el `px-3` de HeroUI, que ya coordina input, prefijo y sufijo. Forzar `padding-inline` propio obligaría a pelear con `ps-0`/`pe-0` que HeroUI aplica cuando hay slots; el beneficio visual no compensa el riesgo de especificidad. `md` es el default.

Los iconos de los slots se dimensionan con un mapa (`sm`/`md` → `sm`, `lg` → `md`) para acompañar la altura sin romper la línea base.

### D5. Accesibilidad

- `useId()` genera `fieldId`; si el consumidor pasa `id`, ese valor manda.
- IDs derivados: `descriptionId = \`${fieldId}-description\`` y `errorId = \`${fieldId}-error\``.
- `Label` recibe `htmlFor={fieldId}` e `InputGroup.Input` recibe `id={fieldId}`; la asociación no depende del contexto interno de React Aria.
- `isInvalid` efectivo = `isInvalidProp ?? Boolean(errorMessage)`. Se pasa al `TextField` y se reafirma con `aria-invalid` en el input.
- `aria-describedby` se compone en este orden: `[ariaDescribedBy del consumidor, descriptionId si hay description, errorId si hay errorMessage].filter(Boolean).join(" ")`. Se aplica al input, de modo que la relación es explícita y testeable aunque React Aria también registre sus propios ids.
- `isRequired` se pasa al `TextField` y el `Label` recibe `isRequired`, que agrega el indicador visual y la semántica de requerido.
- `isDisabled`/`isReadOnly` se pasan al `TextField` y al input; el CSS de HeroUI aplica `status-disabled` y la semántica nativa queda en el DOM.
- El `FieldError` se renderiza solo cuando hay `errorMessage`; `Description` solo cuando hay `description`.
- La descripción y el error pueden coexistir en el DOM. Con el campo inválido, HeroUI oculta la descripción visualmente y muestra el error; el test verifica la presencia y el estado, no el `display` calculado (jsdom no aplica CSS externo).

Alternativa descartada: confiar únicamente en el cableado automático de React Aria. Funciona para el caso feliz, pero no permite garantizar el merge con un `aria-describedby` del consumidor ni testear la relación sin depender de detalles internos.

### D6. Contraseña con visibilidad alternable

- `type="password"` activa un estado local `isVisible` (por defecto `false`, es decir, enmascarado).
- El tipo efectivo es `isVisible ? "text" : "password"`; el resto de tipos pasa sin cambios.
- El toggle es un `Button` de HeroUI `isIconOnly`, `variant="ghost"`, `type="button"` (evita submits accidentales), con `IconEye`/`IconEyeClosed` del DS.
- Accesibilidad del toggle:
  - `aria-label` alterna entre `"Mostrar contraseña"` y `"Ocultar contraseña"`.
  - `aria-pressed={isVisible}` refleja el estado.
  - `aria-controls={fieldId}` lo vincula al campo.
  - `isDisabled={isDisabled}`: el toggle se deshabilita con el campo. `isReadOnly` **no** lo deshabilita, porque alternar la visibilidad no modifica el valor.
- El toggle se agrega al final del `Suffix`, después de `endContent`, para que un icono de consumidor y el control de visibilidad convivan.
- Al cambiar `type` fuera de `password`, el estado `isVisible` se reinicia para no reutilizar una visibilidad stale.

Alternativa descartada: un toggle externo al campo. Rompe la composición, duplica el estado y deja el control fuera del orden de foco natural del grupo.

### D7. Slots, ref y passthrough

- `startContent` se renderiza dentro de `InputGroup.Prefix` y `endContent` dentro de `InputGroup.Suffix`; los slots solo se montan si hay contenido (o si hay toggle de contraseña).
- `ref` se pasa a `InputGroup.Input`, que lo reenvía al `<input>` de React Aria.
- `value`, `defaultValue`, `onChange`, `placeholder`, `name`, `autoComplete`, `type`, `inputMode`, `pattern`, `maxLength`, `onKeyDown`, `onFocus`/`onBlur` y el resto de props nativas se aplican al input, con `onChange` manteniendo la firma `ChangeEventHandler<HTMLInputElement>`.
- `className` se compone con `clsx(inputVariantClasses[variant], inputSizeClasses[size], className)` en la raíz; el consumidor puede agregar layout sin perder tokens.
- `fullWidth`, `isRequired`, `isDisabled`, `isReadOnly`, `isInvalid`, `validate` y el resto de props de `TextField` se pasan a la raíz.
- `error`, `startIcon`, `endIcon` y `disabled` se eliminan del objeto de props antes del spread, incluso si llegan por cast, para que nunca alcancen el DOM ni HeroUI.

### D8. Estrategia de pruebas

Archivo: `src/components/web/input/input.test.tsx`, con `// @vitest-environment jsdom` por archivo (el resto del proyecto `unit` sigue en `node`). Se usa `@testing-library/react` + `cleanup` explícito, igual que `button.test.tsx`.

Bloques:

1. **Contrato de tipos**
   - `expectTypeOf<InputProps["variant"]>().toEqualTypeOf<InputVariant | undefined>()` y lo mismo para `size`.
   - `InputProps` no admite `error`, `startIcon`, `endIcon` ni `disabled`.
   - `ref` es `Ref<HTMLInputElement>`.
   - Los defaults `primary`/`md` están documentados por comportamiento.
2. **Tokens**
   - Extraer todos los `var(--…)` de las clases de variantes y tamaños y exigir prefijo `--nerux-`.
   - Rechazar cualquier `--color-*` legacy y colores hardcodeados (`#`, `rgb(`, `hsl(`).
   - Verificar que cada token referenciado exista en `src/token/generated/semantic.css` o `primitives.css` (sin tokens huérfanos).
3. **Ref y passthrough**
   - `ref` resuelve a `HTMLInputElement`.
   - `value`, `defaultValue`, `placeholder`, `name`, `autoComplete`, `type`, `maxLength` llegan al input.
   - `onChange` se dispara con `fireEvent.change` y recibe el evento nativo.
   - `className` personalizado está en la raíz.
4. **Accesibilidad**
   - `label` está asociada por `htmlFor`/`id`.
   - Con `errorMessage`, el input tiene `aria-invalid="true"`; sin error y sin `isInvalid`, no lo tiene.
   - `aria-describedby` contiene el id de la descripción y el del error cuando ambos existen.
   - Un `aria-describedby` del consumidor se conserva y se mergea.
   - `isRequired` marca el campo como requerido; `isDisabled`/`isReadOnly` se reflejan en el DOM.
5. **Descripción y error**
   - Ambos se renderizan cuando se pasan.
   - Sin `errorMessage` no hay `FieldError`.
   - `isInvalid` externo sin `errorMessage` deja el campo inválido sin mensaje.
6. **Slots**
   - `startContent` y `endContent` aparecen en los extremos correctos y en orden DOM.
   - Sin slots no se renderizan prefijo/sufijo vacíos.
7. **Contraseña**
   - Por defecto `type="password"`.
   - El toggle cambia a `type="text"` y vuelve a `password`.
   - `aria-pressed`, `aria-label`, `aria-controls` y `type="button"` son correctos.
   - Con `isDisabled`, el toggle queda deshabilitado.
8. **Props obsoletas**
   - Inyectar `error`, `startIcon`, `endIcon` y `disabled` por cast y verificar que no llegan al DOM ni generan `aria-invalid`/label.

Limitación asumida: jsdom no calcula estilos, así que la suite valida el **wiring** de tokens y la estructura, no el color renderizado. La verificación visual y de contraste queda en Storybook + `pnpm tokens:check`.

### D9. Stories y archivos

- `input.stories.tsx`: matriz de `variant` × `size`, `label`/`description`, `errorMessage`, `isInvalid`, `startContent`/`endContent`, `password`, `isDisabled`, `isReadOnly`, `isRequired`, `fullWidth` y un caso sin label para búsqueda.
- `input.type.ts` → `input.types.ts` (plural, alineado con `button.types.ts`) con `InputProps`, `InputVariant`, `InputSize`.
- `input.variants.ts` con `inputVariantClasses` e `inputSizeClasses` sobre tokens.
- `index.ts` del input exporta `InputNerux`, los tipos y los mapas.
- `src/components/web/index.ts` pasa a exportar desde `./input` (componente + tipos), y `src/index.ts` ya reexporta `components/web`.

## Risks / Trade-offs

| Riesgo | Mitigación |
|---|---|
| Las variables `--field-*` son un detalle interno de HeroUI y podrían renombrarse en una minor. | Se concentran en `input.variants.ts` y la suite falla si desaparecen del className o del CSS generado. Actualizar HeroUI implica revisar ese archivo. |
| Las clases con propiedades arbitrarias son largas y poco legibles. | Mapa declarativo por variante/tamaño; el test valida el wiring, no la estética. |
| El `--danger` local del grupo (color sólido) podría filtrarse a descendientes que esperan `--danger-text`. | El grupo solo contiene input y slots; label y error viven fuera del grupo y heredan el tono de texto desde la raíz. |
| La descripción se oculta visualmente cuando el campo es inválido. | Es el comportamiento de HeroUI; se documenta y el test verifica la presencia en DOM y el estado inválido. Si se quisiera mostrarla siempre, habría que sobreescribir CSS de HeroUI en otro change. |
| `aria-describedby` explícito podría duplicar ids generados por React Aria. | ARIA admite múltiples ids; el merge incluye los del consumidor y los del DS. Se verifica con `toHaveAttribute`/split, no con igualdad exacta. |
| El toggle de contraseña mueve el foco fuera del input al pulsarlo. | Se mantiene el orden natural de foco y `aria-controls`; si molesta, se evalúa `preventDefault` en `onMouseDown` en un change posterior. |
| `size` no es una prop de HeroUI y depende de overrides de `min-height`/`font-size`. | Solo se sobreescriben dos propiedades; el resto del layout lo resuelve HeroUI. La matriz de stories cubre los tres tamaños en light y dark. |
| Breaking change para consumidores de `error`, `startIcon`/`endIcon` y `disabled`. | Se documenta en stories y en el resumen del change; no hay consumidores internos fuera de las stories. |
| jsdom no valida contraste real. | `pnpm tokens:check` + `validateContrast()` cubren los pares; Storybook y el addon a11y cubren lo visual. |

## Migration Plan

1. Crear `input.variants.ts` y `input.types.ts`; eliminar `input.type.ts` y actualizar imports.
2. Reescribir `input.tsx` con la composición de D1, el puente de tokens de D3, los tamaños de D4, la accesibilidad de D5 y el toggle de D6.
3. Actualizar `index.ts` del input y el barrel de `src/components/web`.
4. Reescribir `input.stories.tsx` con la nueva API y la matriz de estados/temas.
5. Agregar `input.test.tsx` con los bloques de D8.
6. Ejecutar `pnpm test`, `pnpm lint`, `pnpm build` y `pnpm tokens:check`.
7. Verificar en Storybook las dos variantes y tres tamaños en light y dark, con foco, hover, error, disabled y password.

Rollback: el change es autocontenido en `src/components/web/input/` y los barrels. Revertir el commit restaura el wrapper anterior; no hay migraciones de datos ni cambios de tokens.

## Open Questions

- ¿La descripción debe seguir ocultándose cuando hay error, o el DS quiere mostrar ambas? Por ahora se respeta HeroUI (error manda) y se documenta.
- ¿Los `aria-label` del toggle deben ser configurables (`showPasswordLabel`/`hidePasswordLabel`) para i18n? Por ahora se fijan en español, coherentes con las stories.
- ¿Conviene exponer un `InputGroup`/`addon` genérico en un change futuro, o `startContent`/`endContent` cubren los casos de prefijo/sufijo hasta que aparezca un consumidor real?
- ¿El borde inválido debe usar `--nerux-color-danger` o `--nerux-color-danger-text`? Se elige el sólido para que coincida con el anillo; se revisa en la pasada visual.
