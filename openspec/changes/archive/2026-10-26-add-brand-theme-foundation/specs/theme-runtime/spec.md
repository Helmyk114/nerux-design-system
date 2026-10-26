## ADDED Requirements

### Requirement: Provider de tema y marca

El DS SHALL exportar un `NeruxProvider` que reciba la configuración de tema y de marca, y que aplique `data-theme` y `data-brand` al elemento raíz configurado. El Provider SHALL ser opcional: sin él, el DS SHALL funcionar con la marca Nerux y el tema detectado del sistema.

#### Scenario: Provider con configuración

- **WHEN** la aplicación monta `NeruxProvider` con tema y marca
- **THEN** el elemento raíz recibe `data-theme` y `data-brand` correspondientes

#### Scenario: Sin Provider

- **WHEN** la aplicación usa componentes sin `NeruxProvider`
- **THEN** el DS aplica la marca Nerux y el tema del sistema sin errores

### Requirement: Modos de tema

El Provider SHALL soportar los modos `light`, `dark` y `system`. En modo `system` SHALL resolver el tema según `prefers-color-scheme` y SHALL reaccionar a cambios de esa preferencia.

#### Scenario: Modo system

- **WHEN** el tema es `system` y el sistema cambia de claro a oscuro
- **THEN** el tema resuelto del DS cambia a oscuro sin recargar

#### Scenario: Tema explícito

- **WHEN** el tema es `dark`
- **THEN** el DS usa dark aunque el sistema prefiera light

### Requirement: Persistencia de preferencia

El Provider SHALL persistir el tema elegido por el usuario y SHALL restaurarlo en visitas posteriores. La clave de almacenamiento SHALL poder configurarse.

#### Scenario: Restauración

- **WHEN** el usuario elige dark y recarga la aplicación
- **THEN** el DS arranca en dark

#### Scenario: Preferencia inválida

- **WHEN** el valor almacenado no es un tema válido
- **THEN** el DS lo descarta y usa `system`

### Requirement: Hook de tema

El DS SHALL exponer `useNeruxTheme` con el tema seleccionado, el tema resuelto y una función para cambiarlo. El hook SHALL funcionar dentro del Provider y SHALL informar un error claro fuera de él.

#### Scenario: Consumo del hook

- **WHEN** un componente usa `useNeruxTheme` dentro del Provider
- **THEN** obtiene `theme`, `resolvedTheme` y `setTheme`

#### Scenario: Hook fuera del Provider

- **WHEN** se usa `useNeruxTheme` sin Provider
- **THEN** se produce un error explícito que indica que falta el Provider

### Requirement: Soporte SSR sin parpadeo

El DS SHALL funcionar en entornos SSR y SHALL evitar el flash de tema incorrecto (FOUC) mediante un script que aplique el tema antes del primer pintado. La hidratación no SHALL producir desajustes de tema.

#### Scenario: Primer render en servidor

- **WHEN** la página se renderiza en el servidor sin conocer la preferencia del usuario
- **THEN** el script previo al pintado aplica el tema persistido o el del sistema
- **AND** el usuario no observa un cambio de tema visible al hidratar

#### Scenario: Sin acceso a almacenamiento

- **WHEN** el almacenamiento del navegador no está disponible
- **THEN** el DS usa `system` sin lanzar errores

### Requirement: Configuración de marca en runtime

El Provider SHALL aceptar la configuración de marca (color primario, logo light, logo dark y favicon) y SHALL aplicarla sobrescribiendo los tokens correspondientes, sin requerir recompilar CSS.

#### Scenario: Marca en runtime

- **WHEN** el Provider recibe un color primario distinto al de Nerux
- **THEN** las variables CSS de marca se actualizan en el documento
- **AND** los componentes reflejan el nuevo color

#### Scenario: Actualización de marca

- **WHEN** cambia la configuración de marca en el Provider
- **THEN** el documento y los componentes se actualizan sin recargar

### Requirement: Integración con Storybook

Storybook SHALL permitir alternar tema y marca para revisar todos los componentes con la marca Nerux y con una configuración personalizada de ejemplo.

#### Scenario: Alternar tema y marca

- **WHEN** se cambia el tema o la marca desde la toolbar de Storybook
- **THEN** todas las stories se renderizan con la combinación seleccionada

#### Scenario: Demostración de personalización

- **WHEN** se abre la story de personalización
- **THEN** se muestra una marca de ejemplo aplicada solo sobre la superficie permitida
