## ADDED Requirements

### Requirement: Fuente única de verdad de tokens

El sistema SHALL definir todos los tokens de diseño en una fuente TypeScript/JSON versionada, y las variables CSS SHALL generarse a partir de esa fuente. Las variables generadas SHALL usar el namespace canónico `--nerux-*` (por ejemplo, `--nerux-color-*` y `--nerux-brand-*`). Ningún archivo CSS de tokens podrá mantener valores duplicados a mano.

#### Scenario: Generación reproducible

- **WHEN** se ejecuta el comando de generación de tokens
- **THEN** se producen los archivos CSS de tokens a partir de la fuente única
- **AND** todas las variables generadas usan el prefijo `--nerux-*`
- **AND** ejecutar la generación dos veces produce exactamente el mismo resultado

#### Scenario: Token sin fuente

- **WHEN** un token aparece en el CSS generado pero no existe en la fuente
- **THEN** la validación falla e indica el token huérfano

### Requirement: Paleta semántica completa en light y dark

La fuente de tokens SHALL cubrir las categorías de color, tipografía, espaciado, bordes, sombras y transiciones. Para color SHALL existir, en ambos temas, el conjunto completo de marca, semánticos (success, warning, danger, info), superficies, bordes, texto y estados (default, hover, active, disabled, focus).

#### Scenario: Cobertura por tema

- **WHEN** se enumeran los tokens de color de la fuente
- **THEN** cada token tiene un valor definido para `light` y para `dark`

#### Scenario: Token usado sin definir

- **WHEN** un componente referencia `var(--token)` y ese token no está definido para el tema activo
- **THEN** la validación de tokens lo reporta como error

### Requirement: Paleta de marca Nerux por defecto

El sistema SHALL incluir una paleta de marca Nerux nueva y completa, con color primario, escala de estados y foreground accesible, definida para light y dark. La paleta SHALL reemplazar los valores morados actuales como identidad por defecto.

#### Scenario: Marca por defecto

- **WHEN** una aplicación usa el DS sin configuración de marca
- **THEN** se aplica la paleta Nerux en el tema activo
- **AND** los componentes de HeroUI heredan el color primario de Nerux

### Requirement: Mapeo completo de variables de HeroUI

El sistema SHALL mapear las variables de tema de HeroUI v3 a los tokens semánticos del DS, incluyendo como mínimo accent, focus, success, warning, danger, field, surface, overlay, border, separator y link, en light y dark.

#### Scenario: Componente HeroUI sin overrides

- **WHEN** se renderiza un componente de HeroUI sin clases de color propias
- **THEN** sus colores provienen de los tokens del DS
- **AND** el resultado es correcto en light y en dark

### Requirement: Aliases deprecated para tokens renombrados

Cuando un token existente se renombre o se reorganice, el sistema SHALL mantener un alias con el nombre anterior que resuelva al nuevo token, marcado como deprecated y con fecha de retiro documentada.

#### Scenario: Consumidor con token antiguo

- **WHEN** un consumidor usa una variable CSS con el nombre anterior
- **THEN** el valor visual sigue siendo el correcto
- **AND** la documentación indica el nombre nuevo y el reemplazo

### Requirement: Validación de contraste accesible

El sistema SHALL validar automáticamente el contraste de las combinaciones de color expuestas (texto sobre fondo, texto sobre marca, texto sobre semánticos) y SHALL fallar la validación si alguna combinación no alcanza WCAG AA.

#### Scenario: Combinación con contraste insuficiente

- **WHEN** un par de tokens de texto y fondo no alcanza el ratio AA
- **THEN** la validación falla e identifica ambos tokens y el ratio calculado

#### Scenario: Paleta válida

- **WHEN** todos los pares expuestos alcanzan AA
- **THEN** la validación termina correctamente

### Requirement: Tipos de tokens alineados con la fuente

Los tipos públicos de tokens SHALL generarse o derivarse de la misma fuente, de modo que no existan tokens declarados inexistentes ni tokens reales sin tipo.

#### Scenario: Tipo inexistente

- **WHEN** se usa un nombre de token que no existe en la fuente
- **THEN** TypeScript reporta un error de compilación

#### Scenario: Token real sin tipo

- **WHEN** se añade un token a la fuente
- **THEN** el tipo público lo incluye tras la generación
