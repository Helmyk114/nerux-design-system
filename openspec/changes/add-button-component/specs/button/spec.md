## ADDED Requirements

### Requirement: Variantes y tamaños

El componente SHALL aceptar exactamente las variantes `primary`, `secondary`, `tertiary`, `outline`, `ghost`, `danger` y `danger-soft`, y los tamaños `sm`, `md` y `lg`. Los valores por defecto SHALL ser `primary` y `md`. Cada variante SHALL producir una apariencia distinguible y el tamaño SHALL delegarse a HeroUI sin redefinir alturas ni espaciados propios.

#### Scenario: Variante por defecto

- **WHEN** se renderiza el botón sin indicar `variant`
- **THEN** el botón usa la variante `primary`

#### Scenario: Las siete variantes son aceptadas

- **WHEN** se renderiza el botón una vez por cada variante declarada
- **THEN** cada render aplica su variante sin errores de tipos
- **AND** cada variante produce un par de color fondo/foreground distinto

#### Scenario: Tamaño por defecto

- **WHEN** se renderiza el botón sin indicar `size`
- **THEN** el botón usa el tamaño `md`

#### Scenario: Los tres tamaños son aceptados

- **WHEN** se renderiza el botón con `size` igual a `sm`, `md` y `lg`
- **THEN** cada render aplica el tamaño correspondiente de HeroUI

### Requirement: Superficie pública de props

El componente SHALL exponer `variant`, `size`, `isLoading`, `isDisabled`, `type`, `startContent`, `endContent`, `children`, `ref` y las props restantes de HeroUI. `type` SHALL tener default `"button"`. El componente SHALL NOT aceptar `color`, `startIcon`, `endIcon`, `isPending`, `href` ni `render`, y esas props SHALL NOT llegar al DOM.

#### Scenario: Defaults del contrato

- **WHEN** se renderiza el botón solo con `children`
- **THEN** `variant` es `primary`, `size` es `md`, `isLoading` es `false` e `isDisabled` es `false`
- **AND** el atributo `type` del `<button>` es `"button"`

#### Scenario: Props retiradas

- **WHEN** un consumidor intenta usar `color`, `startIcon` o `endIcon`
- **THEN** el compilador de TypeScript rechaza la prop
- **AND** ninguna de ellas se reenvía al DOM

#### Scenario: Una sola API de carga

- **WHEN** un consumidor intenta usar `isPending`
- **THEN** el compilador de TypeScript rechaza la prop
- **AND** la única vía de carga es `isLoading`

### Requirement: Consumo estricto de tokens

Los estilos de color del componente SHALL referenciar únicamente variables del namespace `--nerux-*`. El componente SHALL alimentar las variables locales de estado de HeroUI (`--button-bg`, `--button-bg-hover`, `--button-bg-pressed` y `--button-fg`) con esos tokens. El componente SHALL NOT usar variables legacy `--color-*` ni valores de color hardcodeados; solo se admiten palabras clave como `transparent`.

#### Scenario: Wiring de tokens por variante

- **WHEN** se renderiza cualquiera de las siete variantes
- **THEN** toda referencia `var(--…)` de sus clases de color apunta a un token `--nerux-*`
- **AND** las variables `--button-*` quedan definidas a partir de esos tokens

#### Scenario: Sin tokens legacy

- **WHEN** se inspeccionan las clases de color de cualquier variante
- **THEN** no aparece ninguna referencia a `--color-*` fuera del namespace `--nerux-*`

#### Scenario: Token inexistente

- **WHEN** una variante referencia un token `--nerux-*` que no existe en el CSS generado
- **THEN** la suite de contrato falla e identifica el token huérfano

#### Scenario: Herencia de tema y marca

- **WHEN** el documento cambia `data-theme` o `data-brand`
- **THEN** el botón refleja los nuevos valores sin recargar
- **AND** no redefine colores por fuera de los tokens

### Requirement: Contraste de los pares de color

Cada par fondo/foreground de una variante SHALL estar cubierto por la validación de contraste del Design System con un mínimo de 4.5:1. El par de `primary` SHALL derivarse del color de marca y su foreground. Si un par no está cubierto, SHALL agregarse a la validación de contraste sin crear tokens nuevos.

#### Scenario: Pares cubiertos

- **WHEN** se ejecuta la validación de contraste del token pipeline
- **THEN** todos los pares fondo/foreground de las variantes cumplen el mínimo exigido

#### Scenario: Marca personalizada

- **WHEN** una aplicación define un color primario de marca
- **THEN** el foreground de `primary` se deriva con la lógica de contraste del DS
- **AND** el par resultante cumple el mínimo exigido

#### Scenario: Par sin cobertura

- **WHEN** una variante usa un par fondo/foreground que no está en la lista validada
- **THEN** la suite de contrato falla
- **AND** el par debe registrarse antes de dar el cambio por completo

### Requirement: Prohibición absoluta de navegación

El componente SHALL renderizar siempre un elemento nativo `<button>`. SHALL NOT aceptar ni emitir `href`, `target`, `rel`, `download`, `hrefLang`, `ping` ni `referrerPolicy`, aunque lleguen mediante un cast. SHALL NOT permitir renderizarse como `<a>` ni aceptar la prop `render` de HeroUI. La navegación SHALL delegarse exclusivamente a `Link` de `@heroui/react`.

#### Scenario: Intento de href en runtime

- **WHEN** se pasa `href` al botón mediante un cast
- **THEN** el elemento renderizado sigue siendo `<button>`
- **AND** el atributo `href` no existe en el DOM

#### Scenario: Intento de href en tipos

- **WHEN** un consumidor intenta declarar `href` en `ButtonProps`
- **THEN** el compilador de TypeScript rechaza la prop

#### Scenario: Intento de renderizar como ancla

- **WHEN** un consumidor intenta usar `render` para sustituir el elemento
- **THEN** el compilador de TypeScript rechaza la prop
- **AND** el componente nunca produce un `<a>`

#### Scenario: Navegación con Link

- **WHEN** una aplicación necesita navegar
- **THEN** usa `Link` de `@heroui/react` con su `href`
- **AND** no usa el botón para navegar

### Requirement: Reenvío de ref

El componente SHALL reenviar la `ref` al elemento `<button>` nativo. SHALL soportar tanto refs de objeto como refs de callback.

#### Scenario: Ref de objeto

- **WHEN** se pasa una `ref` de objeto al botón
- **THEN** `ref.current` es una instancia de `HTMLButtonElement`
- **AND** es el mismo nodo que el botón renderizado

#### Scenario: Ref de callback

- **WHEN** se pasa una función de callback como `ref`
- **THEN** la función recibe el `<button>` nativo

### Requirement: Passthrough de props

El componente SHALL reenviar las props nativas y de HeroUI que no controla, incluyendo `aria-*`, `data-*`, `className`, `onPress`, `fullWidth` e `isIconOnly`. El `className` del consumidor SHALL combinarse con las clases de color del DS sin eliminarlas. Las props controladas por el DS SHALL mantener su precedencia.

#### Scenario: Atributos ARIA y className

- **WHEN** se pasa `aria-label` y un `className` personalizado
- **THEN** ambos llegan al `<button>` renderizado
- **AND** las clases de color del DS siguen presentes

#### Scenario: Manejador de eventos

- **WHEN** se hace click o se activa el botón por teclado
- **THEN** se invoca el `onPress` provisto por el consumidor

#### Scenario: Props de layout

- **WHEN** se pasa `fullWidth` o `isIconOnly`
- **THEN** HeroUI aplica el comportamiento correspondiente
- **AND** el contrato de tokens y navegación se mantiene

### Requirement: Estado de carga

Cuando `isLoading` es `true`, el componente SHALL mapear a `isPending` de HeroUI, SHALL inyectar un `Spinner`, SHALL exponer `aria-busy="true"` y SHALL bloquear la interacción. El `Spinner` SHALL sustituir temporalmente a `startContent`. Cuando `isLoading` es `false`, no SHALL renderizar spinner ni `aria-busy`.

#### Scenario: Activación de la carga

- **WHEN** se renderiza el botón con `isLoading`
- **THEN** HeroUI recibe `isPending`
- **AND** el botón expone `aria-busy="true"`
- **AND** se renderiza un único `Spinner`

#### Scenario: Interacción bloqueada

- **WHEN** el botón está cargando y se intenta activar
- **THEN** `onPress` no se invoca

#### Scenario: Sustitución de startContent

- **WHEN** el botón tiene `startContent` y `isLoading` está activo
- **THEN** el `Spinner` ocupa el lugar de `startContent`
- **AND** `startContent` no se renderiza

#### Scenario: Contenido durante la carga

- **WHEN** el botón está cargando y tiene `children` y `endContent`
- **THEN** ambos se siguen renderizando

#### Scenario: Sin carga

- **WHEN** `isLoading` es `false`
- **THEN** no hay `aria-busy`
- **AND** no se renderiza ningún `Spinner`

### Requirement: Slots de contenido

El componente SHALL renderizar `startContent`, `children` y `endContent` simultáneamente y en ese orden cuando no está cargando. Cada slot SHALL aceptar cualquier `ReactNode`. El `endContent` SHALL conservarse durante la carga.

#### Scenario: Ambos slots presentes

- **WHEN** se pasan `startContent` y `endContent` junto con `children`
- **THEN** los tres contenidos se renderizan en el mismo botón

#### Scenario: Orden de los slots

- **WHEN** se inspecciona el DOM del botón
- **THEN** `startContent` aparece antes de `children`
- **AND** `endContent` aparece después de `children`

#### Scenario: Solo contenido principal

- **WHEN** no se pasan slots
- **THEN** el botón renderiza únicamente `children` sin nodos vacíos adicionales

### Requirement: Accesibilidad y estados

El botón SHALL exponer semántica nativa de botón, un nombre accesible proveniente del contenido o de `aria-label`, activación por teclado con Enter y Espacio, foco visible con el anillo del DS y estado deshabilitado anunciable. `aria-busy` SHALL aparecer únicamente durante la carga.

#### Scenario: Nombre accesible

- **WHEN** se renderiza el botón con texto o con `aria-label`
- **THEN** el elemento tiene rol `button` y un nombre accesible

#### Scenario: Activación por teclado

- **WHEN** el botón tiene foco y se presiona Enter o Espacio
- **THEN** se invoca `onPress`

#### Scenario: Foco visible

- **WHEN** el botón recibe foco por teclado
- **THEN** se muestra el anillo de foco basado en los tokens del DS

#### Scenario: Estado deshabilitado

- **WHEN** `isDisabled` es `true`
- **THEN** el estado deshabilitado se anuncia al usuario
- **AND** el botón no se puede activar

### Requirement: Suite de contrato

El change SHALL incluir `src/components/web/button/button.test.tsx`, ejecutable con el comando de tests del proyecto bajo `jsdom`. La suite SHALL cubrir tokens, exclusión de `href`, passthrough y `ref`, estado de carga, slots y accesibilidad, y SHALL fallar si una regresión rompe cualquiera de esos contratos.

#### Scenario: Ejecución completa

- **WHEN** se ejecuta la suite de tests del proyecto
- **THEN** todos los bloques del contrato del botón pasan

#### Scenario: Regresión de navegación

- **WHEN** una implementación vuelve a aceptar o emitir `href`
- **THEN** la suite falla

#### Scenario: Regresión de tokens

- **WHEN** una implementación introduce un token legacy o uno inexistente
- **THEN** la suite falla e indica el token problemático

### Requirement: Stories actualizadas

Las stories del botón SHALL usar la nueva superficie pública y cubrir las siete variantes, los tres tamaños, `isLoading`, los slots, `isDisabled` y los temas light y dark. SHALL NOT usar `color`, `startIcon` ni `endIcon`.

#### Scenario: Catálogo de variantes y tamaños

- **WHEN** se abre la story del botón en Storybook
- **THEN** se pueden inspeccionar las siete variantes y los tres tamaños

#### Scenario: Estados y slots documentados

- **WHEN** se revisan las stories
- **THEN** existen casos para loading, slots, disabled y ambos temas

#### Scenario: Sin API obsoleta

- **WHEN** se buscan `color`, `startIcon` o `endIcon` en las stories
- **THEN** no aparecen usos de esas props
