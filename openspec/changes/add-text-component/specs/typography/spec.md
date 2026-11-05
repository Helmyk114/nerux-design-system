## ADDED Requirements

### Requirement: Escala tipográfica semántica unificada

`TextNerux` SHALL exponer una única escala semántica de 10 variantes mediante la prop `variant`, con `body-md` como valor por defecto. Cada variante SHALL aplicar tamaño de fuente, familia, interlineado y peso por defecto derivados exclusivamente de tokens `--nerux-*`, según la siguiente tabla:

| `variant` | Tamaño | Peso por defecto | Interlineado | Familia |
| --- | --- | --- | --- | --- |
| `display` | `--nerux-font-size-2xl` | `--nerux-font-weight-bold` | `--nerux-line-height-tight` | heading |
| `h1` | `--nerux-font-size-title` | `--nerux-font-weight-semibold` | `--nerux-line-height-tight` | heading |
| `h2` | `--nerux-font-size-xl` | `--nerux-font-weight-semibold` | `--nerux-line-height-tight` | heading |
| `h3` | `--nerux-font-size-lg` | `--nerux-font-weight-semibold` | `--nerux-line-height-tight` | heading |
| `h4` | `--nerux-font-size-md` | `--nerux-font-weight-semibold` | `--nerux-line-height-normal` | heading |
| `body-lg` | `--nerux-font-size-lg` | `--nerux-font-weight-regular` | `--nerux-line-height-relaxed` | body |
| `body-md` | `--nerux-font-size-body` | `--nerux-font-weight-regular` | `--nerux-line-height-normal` | body |
| `body-sm` | `--nerux-font-size-sm` | `--nerux-font-weight-regular` | `--nerux-line-height-normal` | body |
| `caption` | `--nerux-font-size-caption` | `--nerux-font-weight-regular` | `--nerux-line-height-normal` | body |
| `overline` | `--nerux-font-size-xs` | `--nerux-font-weight-semibold` | `--nerux-line-height-normal` | body |

La variante `overline` SHALL aplicar `text-transform: uppercase` como parte de su definición.

#### Scenario: Render por defecto

- **WHEN** se renderiza `<TextNerux>texto</TextNerux>` sin props de estilo
- **THEN** se renderiza un elemento `p`
- **AND** aplica el tamaño, peso, interlineado y familia de `body-md`

#### Scenario: Variantes de encabezado

- **WHEN** se renderiza una variante de la familia `display` o `h1`–`h4`
- **THEN** aplica el tamaño, peso, interlineado y familia heading definidos para esa variante

#### Scenario: Variantes de cuerpo y auxiliares

- **WHEN** se renderiza una variante `body-lg`, `body-md`, `body-sm`, `caption` u `overline`
- **THEN** aplica el tamaño, peso, interlineado y familia body definidos para esa variante
- **AND** `overline` se muestra en mayúsculas

#### Scenario: Variante desconocida

- **WHEN** un consumidor intenta usar un valor de `variant` fuera de la escala definida
- **THEN** TypeScript rechaza la prop en compilación

### Requirement: Polimorfismo seguro mediante `as`

`TextNerux` SHALL separar la jerarquía visual (`variant`) de la semántica del DOM mediante la prop `as`. Cuando `as` se omite, el tag SHALL derivarse de la variante: `display` y `h1` renderizan `h1`, `h2` renderiza `h2`, `h3` renderiza `h3`, `h4` renderiza `h4`, `body-*` renderiza `p`, y `caption` y `overline` renderizan `span`. Cuando `as` se proporciona, SHALL prevalecer sobre el tag por defecto sin alterar las clases de la variante.

El tipado SHALL ser genérico sobre el elemento elegido: las props nativas y el tipo de `ref` SHALL inferirse de `as` mediante `ComponentPropsWithoutRef` y `ComponentPropsWithRef`. La prop `as` y las props propias del componente no SHALL reenviarse al DOM.

#### Scenario: Tag semántico por defecto

- **WHEN** se renderiza una variante sin `as`
- **THEN** el elemento renderizado corresponde al tag por defecto de esa variante

#### Scenario: Separación entre estilo y semántica

- **WHEN** se renderiza `<TextNerux variant="h3" as="h2">`
- **THEN** el DOM contiene un elemento `h2`
- **AND** conserva el tamaño, peso, interlineado y familia de la variante `h3`

#### Scenario: Inferencia de props nativas

- **WHEN** se renderiza `<TextNerux as="a" href="/docs">`
- **THEN** TypeScript acepta `href` como prop válida
- **AND** el DOM contiene un ancla con el `href` indicado

#### Scenario: Prevención de fugas al DOM

- **WHEN** se renderiza `TextNerux` con `as`, `variant`, `weight`, `color`, `align` o `size`
- **THEN** ninguna de esas props aparece como atributo en el elemento renderizado

### Requirement: Alias de compatibilidad `size`

`TextNerux` SHALL aceptar `size` como alias de `variant`, tipado con los mismos 10 valores. Cuando ambas props se proporcionan, `variant` SHALL tener precedencia. La prop `size` no SHALL reenviarse al DOM.

#### Scenario: Uso del alias

- **WHEN** se renderiza `<TextNerux size="h2">`
- **THEN** aplica la escala y el tag por defecto de `h2`

#### Scenario: Precedencia de `variant`

- **WHEN** se renderiza `<TextNerux variant="body-sm" size="h1">`
- **THEN** aplica la escala de `body-sm`
- **AND** `size` no sobrescribe a `variant`

#### Scenario: Alias inválido

- **WHEN** se usa un valor de `size` fuera de la escala definida
- **THEN** TypeScript rechaza la prop en compilación

### Requirement: Eje de peso configurable

`TextNerux` SHALL aceptar la prop `weight` con los valores `regular`, `medium`, `semibold` y `bold`. Cuando `weight` se omite, SHALL aplicarse el peso por defecto de la variante definido en la escala. Cuando se proporciona, SHALL reemplazar el peso por defecto sin acumular clases de peso.

#### Scenario: Peso por defecto

- **WHEN** se renderiza una variante sin `weight`
- **THEN** aplica el peso por defecto de esa variante

#### Scenario: Sobrescritura de peso

- **WHEN** se renderiza `<TextNerux variant="body-md" weight="bold">`
- **THEN** aplica únicamente el token de peso `bold`
- **AND** conserva el tamaño, interlineado, familia y color de `body-md`

#### Scenario: Peso inválido

- **WHEN** se usa un valor de `weight` fuera del conjunto permitido
- **THEN** TypeScript rechaza la prop en compilación

### Requirement: Colores semánticos de texto

`TextNerux` SHALL aceptar la prop `color` con los valores `default`, `secondary`, `muted`, `success`, `warning`, `danger`, `brand` e `inverse`, con `default` como valor por defecto. Cada valor SHALL mapear exclusivamente a un token `--nerux-*`, según la siguiente tabla:

| `color` | Token |
| --- | --- |
| `default` | `--nerux-color-text-default` |
| `secondary` | `--nerux-color-text-secondary` |
| `muted` | `--nerux-color-text-disabled` |
| `success` | `--nerux-color-success-text` |
| `warning` | `--nerux-color-warning-text` |
| `danger` | `--nerux-color-danger-text` |
| `brand` | `--nerux-brand-base` |
| `inverse` | `--nerux-color-text-inverse` |

El color SHALL resolverse en runtime mediante la variable CSS, de modo que los cambios de tema light/dark y de marca se reflejen sin re-renderizar el componente.

#### Scenario: Color por defecto

- **WHEN** se renderiza una variante sin `color`
- **THEN** aplica `--nerux-color-text-default`

#### Scenario: Colores semánticos

- **WHEN** se renderiza `TextNerux` con cualquiera de los 8 valores de `color`
- **THEN** el color de texto referencia el token correspondiente de la tabla

#### Scenario: Cambio de tema

- **WHEN** el tema del documento cambia entre light y dark
- **THEN** el color del texto se actualiza sin cambiar la estructura ni las props del componente

#### Scenario: Color inválido

- **WHEN** se usa un valor de `color` fuera del conjunto permitido
- **THEN** TypeScript rechaza la prop en compilación

### Requirement: Alineación y modificadores de texto

`TextNerux` SHALL aceptar la prop `align` con los valores `left`, `center`, `right` y `justify`, sin aplicar alineación cuando se omite. SHALL aceptar además los modificadores booleanos `truncate`, `italic`, `uppercase` y `noWrap`, todos con valor por defecto `false`.

- `truncate` SHALL aplicar `display: block`, `overflow: hidden`, `text-overflow: ellipsis` y `white-space: nowrap`.
- `noWrap` SHALL aplicar `white-space: nowrap` sin truncamiento.
- `italic` SHALL aplicar `font-style: italic`.
- `uppercase` SHALL aplicar `text-transform: uppercase`.
- Cuando `truncate` y `noWrap` coexisten, `white-space: nowrap` SHALL emitirse una sola vez.

Los modificadores no SHALL introducir tamaños, pesos, colores ni valores hardcodeados.

#### Scenario: Alineación

- **WHEN** se renderiza `TextNerux` con cada valor de `align`
- **THEN** aplica exclusivamente la alineación correspondiente

#### Scenario: Truncamiento

- **WHEN** se renderiza `<TextNerux truncate>`
- **THEN** aplica truncamiento con elipsis y una sola declaración de `white-space: nowrap`

#### Scenario: Modificadores combinados

- **WHEN** se renderiza `<TextNerux italic uppercase noWrap>`
- **THEN** aplica estilo itálico, mayúsculas y ausencia de saltos de línea
- **AND** no altera la variante, el peso ni el color configurados

#### Scenario: Sin modificadores

- **WHEN** se renderiza `TextNerux` sin modificadores
- **THEN** no emite ninguna de las clases de truncamiento, cursiva, mayúsculas o `noWrap`

### Requirement: Reenvío de `ref` y passthrough estricto de props

`TextNerux` SHALL reenviar `ref` al elemento DOM renderizado, tipado según el elemento resuelto por `as`. SHALL propagar sin transformación las props nativas restantes, incluyendo `id`, `role`, `aria-*`, `data-*`, manejadores de eventos y `className`. Las props propias del componente (`variant`, `size`, `weight`, `color`, `align`, `truncate`, `italic`, `uppercase`, `noWrap`, `as`) SHALL consumirse internamente y no SHALL llegar al DOM.

`className` SHALL componerse al final, después de las clases de variante, peso, color, alineación y modificadores, para permitir extensiones del consumidor sin que el componente las sobrescriba.

#### Scenario: Reenvío de ref

- **WHEN** se pasa un `ref` a `TextNerux`
- **THEN** el `ref` apunta al nodo DOM renderizado
- **AND** su tipo corresponde al elemento indicado por `as`

#### Scenario: Passthrough de accesibilidad y datos

- **WHEN** se pasan `id`, `role`, `aria-label`, `aria-describedby`, `data-testid` y un manejador `onClick`
- **THEN** todos llegan al elemento DOM
- **AND** los eventos se disparan al interactuar con el texto

#### Scenario: Composición de `className`

- **WHEN** se pasa un `className` adicional
- **THEN** se concatena al final de las clases del componente
- **AND** las clases de la variante, peso, color y modificadores permanecen presentes

### Requirement: Consumo exclusivo de tokens `--nerux-*`

Todo valor tipográfico y de color emitido por `TextNerux` SHALL provenir de una variable `--nerux-*` existente en los CSS generados del pipeline de tokens. El componente no SHALL usar utilidades tipográficas de Tailwind (`text-{size}`, `font-{weight}`, `leading-*`, `tracking-*`), colores de paleta de Tailwind ni valores hardcodeados (`#`, `rgb()`, `hsl()`).

Todo token referenciado por los mapas de variantes SHALL existir en `src/token/generated/primitives.css`, `semantic.css`, `brands.css` o `aliases.css`; el componente no SHALL declarar tokens locales.

#### Scenario: Valores desde tokens

- **WHEN** se inspeccionan las clases generadas por cualquier variante, peso, color o modificador
- **THEN** cada valor tipográfico o de color referencia `var(--nerux-*)`

#### Scenario: Tokens inexistentes

- **WHEN** un mapa de variantes referencia un token `--nerux-*` que no existe en los CSS generados
- **THEN** la suite de contrato falla

#### Scenario: Utilidades o colores prohibidos

- **WHEN** un mapa de variantes incluye una utilidad tipográfica de Tailwind o un valor hardcodeado
- **THEN** la suite de contrato falla

### Requirement: Suite de contrato en `jsdom`

El cambio SHALL incluir `text.test.tsx` como suite de contrato y comportamiento ejecutada en `jsdom`, cubriendo como mínimo: render por defecto, tag por variante, polimorfismo con `as`, precedencia de `variant` sobre `size`, pesos, colores, alineación, modificadores, reenvío de `ref`, passthrough de props y ARIA, composición de `className`, existencia de tokens y ausencia de utilidades o colores prohibidos.

#### Scenario: Cobertura de contrato

- **WHEN** se ejecuta `pnpm test`
- **THEN** la suite de `text.test.tsx` se ejecuta en `jsdom` y todas sus aserciones pasan

#### Scenario: Detección de regresiones de API

- **WHEN** una variante, tag por defecto, token o precedencia cambia respecto de esta especificación
- **THEN** al menos un test de contrato falla

### Requirement: Catálogo visual en Storybook

El cambio SHALL actualizar las stories de Storybook para documentar la escala completa, los pesos, los colores semánticos, la alineación y los modificadores, y SHALL permitir verificar los temas light/dark mediante el toolbar global.

#### Scenario: Escala completa

- **WHEN** se abre la story de escala en Storybook
- **THEN** se muestran las 10 variantes con su tag y apariencia por defecto

#### Scenario: Temas y marca

- **WHEN** se alterna el tema light/dark o la marca en el toolbar de Storybook
- **THEN** los textos reflejan los tokens correspondientes sin cambios de estructura

### Requirement: Retiro de la API tipográfica anterior

`TextNerux` SHALL dejar de aceptar la API anterior (`variant: title | subtitle | body | caption | error` y `color: primary | secondary | error | success | warning`). El barrel público SHALL exportar un único `TextNerux` desde `src/components/web/text/`, y la implementación `src/components/web/texto/` SHALL retirarse. Los consumidores internos, incluido `SelectNerux`, SHALL migrarse a la nueva escala y colores semánticos.

#### Scenario: API anterior rechazada

- **WHEN** un consumidor usa `variant="title"`, `variant="error"` o `color="error"` con `TextNerux`
- **THEN** TypeScript rechaza la prop en compilación

#### Scenario: Export único

- **WHEN** se importa `TextNerux` desde la API pública del paquete
- **THEN** se resuelve la implementación de `src/components/web/text/`
- **AND** no existe una segunda exportación en conflicto

#### Scenario: Consumidor interno migrado

- **WHEN** `SelectNerux` muestra un mensaje de error
- **THEN** usa `TextNerux` con la nueva escala y `color="danger"`
- **AND** el build no contiene referencias a `src/components/web/texto/`
