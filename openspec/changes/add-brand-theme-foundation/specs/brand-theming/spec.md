## ADDED Requirements

### Requirement: Marca por defecto Nerux

El DS SHALL definir `nerux` como marca por defecto. Cuando no se especifique marca, el documento SHALL resolverse con `data-brand="nerux"`.

#### Scenario: Sin configuración de marca

- **WHEN** una aplicación monta el DS sin indicar marca
- **THEN** el documento usa `data-brand="nerux"`
- **AND** se aplican los tokens de la marca Nerux

#### Scenario: Marca inexistente

- **WHEN** se indica una marca que no está registrada
- **THEN** el DS aplica la marca Nerux como fallback
- **AND** emite una advertencia en desarrollo

### Requirement: Selección de marca por documento

El DS SHALL permitir seleccionar la marca activa mediante el atributo `data-brand` en el elemento raíz del documento, sin requerir JavaScript para el caso estático.

#### Scenario: Marca por CSS

- **WHEN** el documento declara `data-brand="<marca>"` y existe el bloque CSS de esa marca
- **THEN** los componentes usan los tokens de esa marca

#### Scenario: Cambio de marca en runtime

- **WHEN** se actualiza `data-brand` en el elemento raíz
- **THEN** los componentes reflejan la nueva marca sin recargar la página

### Requirement: Superficie de personalización acotada

Una aplicación consumidora SHALL poder personalizar únicamente el color primario de marca, el logo para light, el logo para dark y el favicon. El resto de tokens (superficies, texto, semánticos, tipografía, radios, sombras y espaciado) SHALL heredarse de la marca Nerux salvo que se modifiquen por CSS de forma explícita y documentada.

#### Scenario: Personalización permitida

- **WHEN** una app define su color primario y sus logos
- **THEN** solo cambian los tokens derivados de la marca y los assets indicados
- **AND** el resto del sistema conserva los valores Nerux

#### Scenario: Intento de personalizar fuera de la superficie

- **WHEN** la configuración de marca incluye propiedades no soportadas
- **THEN** el DS las ignora y advierte en desarrollo

### Requirement: Derivación de escala desde un color primario

El consumidor SHALL definir su marca con un único color primario. El DS SHALL derivar automáticamente, para light y dark, los estados hover, active, disabled y focus, el color de texto sobre marca y las variantes necesarias para los componentes. La derivación SHALL ejecutarse 100 % de forma nativa en CSS mediante `oklch()` y `color-mix()`, sin computación de color en JavaScript en runtime.

#### Scenario: Marca con un solo color

- **WHEN** el consumidor proporciona un único color primario
- **THEN** existen valores derivados para hover, active, disabled y focus en ambos temas
- **AND** la derivación se resuelve con `oklch()` y `color-mix()` sin JavaScript en runtime
- **AND** los componentes que usan la marca se renderizan sin valores faltantes

#### Scenario: Color inválido

- **WHEN** el color primario no es un color CSS válido
- **THEN** el DS rechaza la configuración y mantiene la marca Nerux

### Requirement: Contraste automático del texto sobre marca

El DS SHALL elegir el color de texto sobre el color de marca (claro u oscuro) que alcance mayor contraste y SHALL garantizar WCAG AA para el color primario configurado en ambos temas.

#### Scenario: Marca clara

- **WHEN** el color primario es claro
- **THEN** el texto sobre marca usa el color oscuro accesible

#### Scenario: Marca oscura

- **WHEN** el color primario es oscuro
- **THEN** el texto sobre marca usa el color claro accesible

#### Scenario: Marca que no alcanza AA

- **WHEN** el color primario no permite una combinación AA con ningún foreground
- **THEN** el DS ajusta la variante de marca o rechaza la configuración indicando el motivo

### Requirement: Assets de marca por URL

El DS SHALL aceptar el logo light, el logo dark y el favicon como URLs. El logo SHALL cambiar según el tema activo y el favicon SHALL cambiar solo según la marca.

#### Scenario: Cambio de tema con logos

- **WHEN** el tema cambia de light a dark
- **THEN** se muestra el logo dark configurado

#### Scenario: Cambio de marca con favicon

- **WHEN** cambia la marca activa
- **THEN** el favicon del documento se actualiza al de esa marca

#### Scenario: Asset ausente

- **WHEN** una marca no define logo o favicon
- **THEN** se usa el asset por defecto de Nerux
