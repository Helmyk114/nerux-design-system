## ADDED Requirements

### Requirement: Variantes y tamaños

El componente SHALL aceptar exactamente las variantes `primary` y `secondary`, y los tamaños `sm`, `md` y `lg`. Los valores por defecto SHALL ser `primary` y `md`. La variante SHALL controlar superficie, borde, hover y foco a través de tokens del DS, y el tamaño SHALL implementarse en la capa del componente porque HeroUI no expone una prop `size` para el campo de texto.

#### Scenario: Variante por defecto

- **WHEN** se renderiza el input sin indicar `variant`
- **THEN** el campo usa la variante `primary`

#### Scenario: Las dos variantes son aceptadas

- **WHEN** se renderiza el input con `variant="primary"` y con `variant="secondary"`
- **THEN** cada render aplica su variante sin errores de tipos
- **AND** `primary` usa `--nerux-color-surface-default` como superficie
- **AND** `secondary` usa `--nerux-color-surface-secondary` como superficie

#### Scenario: Tamaño por defecto

- **WHEN** se renderiza el input sin indicar `size`
- **THEN** el campo usa el tamaño `md`

#### Scenario: Los tres tamaños son aceptados

- **WHEN** se renderiza el input con `size` igual a `sm`, `md` y `lg`
- **THEN** cada render aplica la altura y el tamaño de fuente correspondientes
- **AND** `sm` usa `--nerux-spacing-8` y `--nerux-font-size-sm`
- **AND** `md` usa `--nerux-spacing-9` y `--nerux-font-size-md`
- **AND** `lg` usa `--nerux-spacing-10` y `--nerux-font-size-lg`

#### Scenario: Tamaño inválido

- **WHEN** un consumidor intenta usar un tamaño distinto de `sm`, `md` o `lg`
- **THEN** el compilador de TypeScript rechaza la prop

### Requirement: Superficie pública de props

El componente SHALL exponer `variant`, `size`, `label`, `description`, `errorMessage`, `startContent`, `endContent`, `className`, `ref` y el resto de props de `TextField` de HeroUI. `label`, `description`, `errorMessage`, `startContent` y `endContent` SHALL aceptar `ReactNode`. `className` SHALL aplicarse a la raíz del campo, no al `<input>` interno.

#### Scenario: Props de composición

- **WHEN** se renderiza el input con `label`, `description` y `errorMessage`
- **THEN** los tres contenidos se renderizan dentro de la raíz del campo
- **AND** `label` se asocia al `<input>`
- **AND** `description` y `errorMessage` quedan referenciados desde el `<input>`

#### Scenario: Contenido libre en slots

- **WHEN** se pasan nodos arbitrarios en `startContent` y `endContent`
- **THEN** ambos se renderizan dentro del campo sin exigir un tipo de icono específico

#### Scenario: className del consumidor

- **WHEN** se pasa un `className` personalizado
- **THEN** la clase llega a la raíz del campo
- **AND** las clases de variante y tamaño del DS se conservan

### Requirement: Etiqueta explícita

El componente SHALL mostrar la etiqueta únicamente a partir de la prop `label`. SHALL NOT derivar la etiqueta, el texto visible ni el nombre accesible de `name`. Cuando `label` no se proporciona, el campo SHALL renderizarse sin `<label>`.

#### Scenario: Label independiente de name

- **WHEN** se renderiza el input con `name="email"` y `label="Correo electrónico"`
- **THEN** el texto visible de la etiqueta es `Correo electrónico`
- **AND** no se renderiza una etiqueta con el texto `email`

#### Scenario: Sin label

- **WHEN** se renderiza el input sin `label`
- **THEN** no se renderiza ningún elemento `<label>` para el campo

#### Scenario: Label con ReactNode

- **WHEN** se pasa un nodo compuesto en `label`
- **THEN** el nodo se renderiza dentro de la etiqueta asociada al input

### Requirement: Estados de validación y mensajes

El componente SHALL marcar el campo como inválido cuando `errorMessage` tenga contenido o cuando `isInvalid` sea `true`. El valor efectivo de invalidez SHALL ser `isInvalid ?? Boolean(errorMessage)`. El componente SHALL renderizar `errorMessage` dentro de un `FieldError` cuando exista y SHALL renderizar `description` dentro de un `Description` cuando exista. El error SHALL tener prioridad visual sobre la descripción cuando el campo es inválido.

#### Scenario: Error derivado del mensaje

- **WHEN** se renderiza el input con `errorMessage="El correo no es válido"`
- **THEN** el campo queda marcado como inválido
- **AND** el mensaje de error se renderiza
- **AND** el `<input>` expone `aria-invalid="true"`

#### Scenario: Invalidez externa sin mensaje

- **WHEN** se renderiza el input con `isInvalid` y sin `errorMessage`
- **THEN** el campo queda marcado como inválido
- **AND** no se renderiza ningún `FieldError`

#### Scenario: Invalidez desactivada

- **WHEN** se renderiza el input sin `errorMessage` y con `isInvalid={false}`
- **THEN** el `<input>` no expone `aria-invalid="true"`

#### Scenario: Descripción y error coexistentes

- **WHEN** se renderiza el input con `description` y `errorMessage`
- **THEN** ambos nodos existen en el DOM
- **AND** el error es el mensaje que se muestra visualmente
- **AND** la descripción queda oculta por el comportamiento de HeroUI mientras el campo es inválido

#### Scenario: Error reemplaza a la prop obsoleta

- **WHEN** un consumidor intenta usar `error` en lugar de `errorMessage`
- **THEN** el compilador de TypeScript rechaza la prop

### Requirement: Accesibilidad

El componente SHALL asociar la etiqueta y el `<input>` mediante `htmlFor`/`id`. SHALL generar identificadores estables para la descripción y el error, y SHALL componer `aria-describedby` en el `<input>` con los ids de descripción y error presentes, conservando cualquier `aria-describedby` provisto por el consumidor. `isRequired`, `isDisabled` e `isReadOnly` SHALL propagarse a la raíz y al `<input>`, y el foco SHALL mostrarse con el anillo del DS.

#### Scenario: Asociación label-input

- **WHEN** se renderiza el input con `label`
- **THEN** el `<label>` tiene `for` igual al `id` del `<input>`
- **AND** el `<input>` tiene ese mismo `id`

#### Scenario: Descripción referenciada

- **WHEN** se renderiza el input con `description` y sin error
- **THEN** `aria-describedby` del `<input>` incluye el id del nodo de descripción

#### Scenario: Error referenciado

- **WHEN** se renderiza el input con `errorMessage`
- **THEN** `aria-describedby` del `<input>` incluye el id del nodo de error

#### Scenario: Merge con el consumidor

- **WHEN** el consumidor pasa `aria-describedby="ayuda-externa"` junto con `description`
- **THEN** el atributo del `<input>` contiene `ayuda-externa` y el id de la descripción

#### Scenario: Campo requerido

- **WHEN** se renderiza el input con `isRequired`
- **THEN** el campo expone la semántica de requerido
- **AND** la etiqueta refleja el estado requerido

#### Scenario: Campo deshabilitado

- **WHEN** se renderiza el input con `isDisabled`
- **THEN** el `<input>` queda deshabilitado
- **AND** el campo aplica el estado deshabilitado de HeroUI

#### Scenario: Campo de solo lectura

- **WHEN** se renderiza el input con `isReadOnly`
- **THEN** el `<input>` expone el estado de solo lectura
- **AND** el valor no se puede editar

#### Scenario: Foco visible

- **WHEN** el input recibe foco por teclado
- **THEN** el campo muestra el anillo de foco basado en `--nerux-color-focus`

### Requirement: Toggle de contraseña

Cuando `type` es `password`, el componente SHALL renderizar un control de visibilidad dentro del campo. El campo SHALL estar enmascarado por defecto y el control SHALL alternar entre `type="password"` y `type="text"`. El control SHALL tener `type="button"`, un nombre accesible que cambie según el estado, `aria-pressed`, `aria-controls` apuntando al input y SHALL quedar deshabilitado cuando el campo está deshabilitado. `isReadOnly` SHALL NOT deshabilitar el control. Para cualquier otro `type`, el control NO SHALL renderizarse.

#### Scenario: Estado inicial enmascarado

- **WHEN** se renderiza el input con `type="password"`
- **THEN** el `<input>` tiene `type="password"`
- **AND** se renderiza un control de visibilidad

#### Scenario: Mostrar la contraseña

- **WHEN** el usuario activa el control de visibilidad
- **THEN** el `<input>` pasa a `type="text"`
- **AND** el control expone `aria-pressed="true"`
- **AND** su nombre accesible indica que oculta la contraseña

#### Scenario: Volver a enmascarar

- **WHEN** el usuario activa el control por segunda vez
- **THEN** el `<input>` vuelve a `type="password"`
- **AND** el control expone `aria-pressed="false"`
- **AND** su nombre accesible indica que muestra la contraseña

#### Scenario: Tipo distinto de contraseña

- **WHEN** se renderiza el input con `type="email"` o `type="text"`
- **THEN** no se renderiza el control de visibilidad

#### Scenario: Campo deshabilitado

- **WHEN** se renderiza el input con `type="password"` e `isDisabled`
- **THEN** el control de visibilidad queda deshabilitado

#### Scenario: Campo de solo lectura

- **WHEN** se renderiza el input con `type="password"` e `isReadOnly`
- **THEN** el control de visibilidad sigue habilitado

#### Scenario: Sin submit accidental

- **WHEN** el control de visibilidad se activa dentro de un formulario
- **THEN** el formulario no se envía
- **AND** el control tiene `type="button"`

### Requirement: Slots de contenido

El componente SHALL renderizar `startContent` dentro del prefijo del grupo y `endContent` dentro del sufijo. Los slots SHALL montarse únicamente cuando tengan contenido, salvo que el toggle de contraseña requiera el sufijo. Cuando `startContent` y `endContent` coexisten, SHALL respetarse el orden DOM prefijo → input → sufijo.

#### Scenario: Ambos slots presentes

- **WHEN** se pasan `startContent` y `endContent`
- **THEN** ambos se renderizan dentro del campo
- **AND** `startContent` aparece antes del `<input>`
- **AND** `endContent` aparece después del `<input>`

#### Scenario: Sin slots

- **WHEN** se renderiza el input sin `startContent`, sin `endContent` y sin contraseña
- **THEN** no se renderizan prefijo ni sufijo vacíos

#### Scenario: Slot y toggle de contraseña

- **WHEN** se renderiza un input de contraseña con `endContent`
- **THEN** el `endContent` se renderiza antes del control de visibilidad
- **AND** ambos quedan dentro del sufijo

### Requirement: Reenvío de ref

El componente SHALL reenviar la `ref` al elemento `<input>` nativo. SHALL soportar refs de objeto y de callback.

#### Scenario: Ref de objeto

- **WHEN** se pasa una `ref` de objeto al input
- **THEN** `ref.current` es una instancia de `HTMLInputElement`
- **AND** es el mismo nodo que el `<input>` renderizado

#### Scenario: Ref de callback

- **WHEN** se pasa una función como `ref`
- **THEN** la función recibe el `<input>` nativo

#### Scenario: Tipo de ref en el contrato

- **WHEN** se inspecciona el tipo de `ref` en `InputProps`
- **THEN** es compatible con `Ref<HTMLInputElement>` y no con la raíz del campo

### Requirement: Passthrough de props

El componente SHALL reenviar al `<input>` las props nativas que no controla, incluyendo `value`, `defaultValue`, `onChange`, `placeholder`, `name`, `autoComplete`, `type`, `inputMode`, `pattern`, `maxLength`, `onKeyDown`, `onFocus` y `onBlur`. `onChange` SHALL mantener la firma `ChangeEventHandler<HTMLInputElement>`. Las props de `TextField` (`fullWidth`, `isRequired`, `isDisabled`, `isReadOnly`, `isInvalid`, `validate` y el resto) SHALL aplicarse a la raíz. Las props controladas por el DS SHALL mantener su precedencia.

#### Scenario: Valor y placeholder

- **WHEN** se renderiza el input con `value`, `defaultValue` o `placeholder`
- **THEN** el `<input>` refleja esos valores

#### Scenario: Cambio de valor

- **WHEN** el usuario escribe en el campo
- **THEN** se invoca el `onChange` provisto por el consumidor
- **AND** el evento es un `ChangeEvent<HTMLInputElement>`

#### Scenario: Atributos nativos

- **WHEN** se pasan `name`, `autoComplete`, `maxLength`, `pattern` o `inputMode`
- **THEN** los atributos llegan al `<input>`

#### Scenario: Props de layout

- **WHEN** se pasa `fullWidth`
- **THEN** HeroUI aplica el ancho completo al campo
- **AND** el contrato de tokens y accesibilidad se mantiene

### Requirement: Purga de props obsoletas

El componente SHALL NOT aceptar `error`, `startIcon`, `endIcon` ni `disabled`. Esas props SHALL eliminarse del objeto de props antes del spread, incluso si llegan mediante un cast, de modo que nunca alcancen el DOM ni HeroUI. La única API de error SHALL ser `errorMessage`, la de slots `startContent`/`endContent` y la de deshabilitado `isDisabled`.

#### Scenario: Rechazo en tipos

- **WHEN** un consumidor intenta usar `error`, `startIcon`, `endIcon` o `disabled`
- **THEN** el compilador de TypeScript rechaza la prop

#### Scenario: Purga en runtime

- **WHEN** se inyectan `error`, `startIcon`, `endIcon` y `disabled` mediante un cast
- **THEN** el DOM no contiene esos atributos
- **AND** `disabled` no deshabilita el `<input>`
- **AND** `error` no marca el campo como inválido

#### Scenario: Migración de la etiqueta

- **WHEN** un consumidor migra desde la API anterior
- **THEN** reemplaza `error` por `errorMessage`
- **AND** reemplaza `startIcon`/`endIcon` por `startContent`/`endContent`
- **AND** reemplaza `disabled` por `isDisabled`
- **AND** agrega `label` explícita si necesita texto visible

### Requirement: Consumo estricto de tokens

Los estilos del componente SHALL referenciar únicamente variables del namespace `--nerux-*`. El componente SHALL alimentar las variables locales de HeroUI (`--field-background`, `--field-foreground`, `--field-placeholder`, `--field-border`, `--field-border-hover`, `--field-border-focus`, `--field-focus`, `--field-shadow`, `--border-width-field`, `--color-field-border-invalid` y `--danger`) con tokens del DS. SHALL NOT usar variables legacy `--color-*` ni valores de color hardcodeados; solo se admiten palabras clave como `transparent` y `none`.

#### Scenario: Wiring de tokens por variante

- **WHEN** se renderiza cualquiera de las dos variantes
- **THEN** toda referencia `var(--…)` de sus clases de color apunta a un token `--nerux-*`
- **AND** las variables `--field-*` y `--border-width-field` quedan definidas a partir de esos tokens

#### Scenario: Estados derivados declarados localmente

- **WHEN** se renderiza el input
- **THEN** `--field-border-hover`, `--field-border-focus` y `--field-focus` se declaran en el componente
- **AND** no dependen de la re-derivación de variables resueltas en `:root`

#### Scenario: Borde inválido resuelto

- **WHEN** el campo está inválido
- **THEN** `--color-field-border-invalid` se resuelve a `--nerux-color-danger`
- **AND** el borde inválido es visible

#### Scenario: Peligro con dos roles

- **WHEN** el campo está inválido
- **THEN** el anillo del grupo usa el color sólido `--nerux-color-danger`
- **AND** la etiqueta y el mensaje de error usan `--nerux-color-danger-text`

#### Scenario: Sin tokens legacy

- **WHEN** se inspeccionan las clases de cualquier variante o tamaño
- **THEN** no aparece ninguna referencia a `--color-*` fuera del namespace `--nerux-*`
- **AND** no aparecen colores hardcodeados `#`, `rgb(`, `hsl(` u `oklch(` literales

#### Scenario: Token inexistente

- **WHEN** una variante o tamaño referencia un token `--nerux-*` que no existe en el CSS generado
- **THEN** la suite de contrato falla e identifica el token huérfano

#### Scenario: Herencia de tema y marca

- **WHEN** el documento cambia `data-theme` o `data-brand`
- **THEN** el campo refleja los nuevos valores sin recargar
- **AND** no redefine colores por fuera de los tokens

### Requirement: Suite de contrato

El change SHALL incluir `src/components/web/input/input.test.tsx`, ejecutable con el comando de tests del proyecto bajo `jsdom`. La suite SHALL cubrir contrato de tipos, tokens, `ref` y passthrough, accesibilidad, descripción y error, slots, contraseña y purga de props obsoletas, y SHALL fallar si una regresión rompe cualquiera de esos contratos.

#### Scenario: Ejecución completa

- **WHEN** se ejecuta la suite de tests del proyecto
- **THEN** todos los bloques del contrato del input pasan

#### Scenario: Regresión de tokens

- **WHEN** una implementación introduce un token legacy, uno inexistente o un color hardcodeado
- **THEN** la suite falla e indica el token o color problemático

#### Scenario: Regresión de accesibilidad

- **WHEN** una implementación deja de asociar la etiqueta, `aria-invalid` o `aria-describedby`
- **THEN** la suite falla

#### Scenario: Regresión de props obsoletas

- **WHEN** una implementación vuelve a aceptar o emitir `error`, `startIcon`, `endIcon` o `disabled`
- **THEN** la suite falla

#### Scenario: Regresión de contraseña

- **WHEN** el toggle deja de alternar el tipo, de exponer `aria-pressed` o de deshabilitarse con el campo
- **THEN** la suite falla

### Requirement: Stories actualizadas

Las stories del input SHALL usar la nueva superficie pública y cubrir las dos variantes, los tres tamaños, `label`/`description`/`errorMessage`, `startContent`/`endContent`, contraseña, `isDisabled`, `isReadOnly`, `isRequired`, `fullWidth` y los temas light y dark. SHALL NOT usar `error`, `startIcon`, `endIcon` ni `disabled`.

#### Scenario: Catálogo de variantes y tamaños

- **WHEN** se abre la story del input en Storybook
- **THEN** se pueden inspeccionar las dos variantes y los tres tamaños

#### Scenario: Estados y slots documentados

- **WHEN** se revisan las stories
- **THEN** existen casos para error, descripción, slots, contraseña, disabled, readOnly y ambos temas

#### Scenario: Sin API obsoleta

- **WHEN** se buscan `error`, `startIcon`, `endIcon` o `disabled` en las stories
- **THEN** no aparecen usos de esas props
