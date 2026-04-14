# Feature Specification: Add LinkNerux Component

**Feature Branch**: `003-add-link-nerux-component`  
**Created**: 13 de abril de 2026  
**Status**: Draft  
**Input**: User description: "Crear el componente LinkNerux para el design system basado en el componente Link de HeroUI v3 (@heroui/react), siguiendo los mismos patrones de los componentes existentes en src/components/web/

Wrapper sobre HeroUI Link:

- Usar Link de @heroui/react como base
- Verificar si HeroUI Link ya soporta prop "as" para polymorphic rendering antes de implementarlo manualmente
- El componente NO importa ni depende de react-router-dom

Para los iconos: usar Link.Icon de HeroUI como wrapper de posicionamiento, y dentro renderizar IconNerux.
Link.Icon maneja el tamaño y alineación, IconNerux provee el icono visual.

Ejemplo interno:
<Link.Icon>
<IconNerux name={startIcon} size="sm" />
</Link.Icon>

IconNerux está en src/components/web/icon/ y recibe: name (string de @tabler/icons-react), size, color, stroke, className.
No usar iconos de ninguna otra librería — solo IconNerux.

Developer journey:

- Uso básico: <LinkNerux href="/ruta">Texto</LinkNerux>
- Uso con react-router-dom: <LinkNerux as={RouterLink} to="/ruta">Texto</LinkNerux>
- Icono izquierda: <LinkNerux href="/ruta" startIcon="arrow-left">Texto</LinkNerux>
- Icono derecha: <LinkNerux href="/ruta" endIcon="arrow-right">Texto</LinkNerux>
- Ambos: <LinkNerux href="/ruta" startIcon="arrow-left" endIcon="external-link">Texto</LinkNerux>
- Disabled: <LinkNerux href="/ruta" disabled>Texto</LinkNerux>

Las props startIcon y endIcon reciben el name del icono (string de @tabler/icons-react) y el componente internamente renderiza <IconNerux name={startIcon} size="sm" /> dentro de <Link.Icon>

Variantes: default, disabled
Contextos de uso: inline (dentro de párrafos), standalone (menús, breadcrumbs), en tablas y listas, dentro de cards

Tokens: usar exclusivamente src/token/ para cualquier override visual sobre HeroUI — ningún valor hardcodeado

Storybook:

- Story por cada variante (default, disabled)
- Story con startIcon, endIcon y ambos iconos
- Story inline dentro de texto
- Story standalone
- Story mostrando uso con react-router-dom via prop "as"

Restricciones:

- Seguir estructura de src/components/web/button/ como referencia (button.tsx, button.stories.ts, button.variant.ts)
- Usar Link.Icon de HeroUI como wrapper y IconNerux adentro
- No usar Link.Icon con iconos de otras librerías
- No romper ningún componente existente
- No hardcodear valores fuera de src/token/"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Basic Link Usage (Priority: P1)

As a developer, I want to use LinkNerux for basic navigation links so that I can create consistent links in the design system.

**Why this priority**: This is the core functionality and most common use case, providing immediate value for basic linking.

**Independent Test**: Can be fully tested by rendering <LinkNerux href="/test">Link</LinkNerux> and verifying it renders as a clickable link.

**Acceptance Scenarios**:

1. **Given** a LinkNerux component with href prop, **When** rendered, **Then** it displays as a clickable link element
2. **Given** a LinkNerux with text content, **When** clicked, **Then** navigates to the specified href

---

### User Story 2 - Link with Icons (Priority: P2)

As a developer, I want to add icons to LinkNerux for better visual communication so that links can include start and end icons.

**Why this priority**: Icons enhance usability and are a common pattern in modern UIs, but not essential for basic functionality.

**Independent Test**: Can be fully tested by rendering LinkNerux with startIcon and endIcon props and verifying icons appear correctly positioned.

**Acceptance Scenarios**:

1. **Given** LinkNerux with startIcon prop, **When** rendered, **Then** displays the icon before the text using Link.Icon wrapper
2. **Given** LinkNerux with endIcon prop, **When** rendered, **Then** displays the icon after the text using Link.Icon wrapper
3. **Given** LinkNerux with both startIcon and endIcon, **When** rendered, **Then** displays both icons correctly positioned

---

### User Story 3 - Polymorphic Link Rendering (Priority: P3)

As a developer, I want to use LinkNerux with different routing libraries like react-router-dom so that it integrates with various navigation systems.

**Why this priority**: Polymorphic rendering enables flexibility for different routing needs, but basic href links work without it.

**Independent Test**: Can be fully tested by rendering LinkNerux with "as" prop set to a custom component and verifying it renders as that component.

**Acceptance Scenarios**:

1. **Given** LinkNerux with "as" prop set to RouterLink, **When** rendered, **Then** uses RouterLink as the base component instead of native anchor
2. **Given** LinkNerux with "as" prop, **When** props are passed, **Then** forwards all props correctly to the polymorphic component

---

### User Story 4 - Disabled Link State (Priority: P4)

As a developer, I want to disable LinkNerux when needed so that links can be conditionally inactive.

**Why this priority**: Disabled state is important for accessibility and UX, but can be added after basic functionality.

**Independent Test**: Can be fully tested by rendering LinkNerux with disabled prop and verifying it appears disabled and non-clickable.

**Acceptance Scenarios**:

1. **Given** LinkNerux with disabled prop, **When** rendered, **Then** appears visually disabled and prevents navigation
2. **Given** disabled LinkNerux, **When** clicked, **Then** does not trigger navigation

### Edge Cases

- What happens when startIcon or endIcon name is invalid?
- How does the component handle long text with icons?
- What happens when both href and "as" props are provided?
- How does disabled state interact with polymorphic rendering?

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: LinkNerux MUST wrap HeroUI Link component as its base
- **FR-002**: LinkNerux MUST support polymorphic rendering via "as" prop if HeroUI Link supports it
- **FR-003**: LinkNerux MUST NOT import or depend on react-router-dom
- **FR-004**: LinkNerux MUST use Link.Icon from HeroUI for icon positioning
- **FR-005**: LinkNerux MUST render IconNerux inside Link.Icon for visual icons
- **FR-006**: LinkNerux MUST accept startIcon and endIcon props as strings from @tabler/icons-react
- **FR-007**: LinkNerux MUST support disabled prop for inactive state
- **FR-008**: LinkNerux MUST use tokens from src/token/ for any visual overrides
- **FR-009**: LinkNerux MUST follow the structure of existing components in src/components/web/
- **FR-010**: LinkNerux MUST include Storybook stories for all variants and use cases

### Key Entities _(include if feature involves data)_

- **LinkNerux Component**: React component that wraps HeroUI Link, accepts props like href, startIcon, endIcon, disabled, as, and children
- **IconNerux**: Existing icon component used for rendering icons within Link.Icon
- **HeroUI Link**: Base component from @heroui/react providing link functionality

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Developers can create basic links using <LinkNerux href="/path">Text</LinkNerux> and verify navigation works
- **SC-002**: LinkNerux with icons renders correctly with startIcon and endIcon props in Storybook
- **SC-003**: LinkNerux supports polymorphic rendering with "as" prop for react-router-dom integration
- **SC-004**: All LinkNerux variants (default, disabled) are testable in Storybook with visual regression tests
- **SC-005**: LinkNerux follows existing component patterns and doesn't break any existing functionality

## Assumptions

- HeroUI Link component supports polymorphic rendering via "as" prop
- IconNerux component is available and functional in src/components/web/icon/
- Tokens in src/token/ provide necessary styling overrides for HeroUI
- Existing button component structure can be used as reference for LinkNerux implementation
