# Data Model: Add LinkNerux Component

**Date**: 13 de abril de 2026
**Feature**: specs/003-add-link-nerux-component/spec.md

## Entities

### LinkNerux Component

**Purpose**: React component that provides a styled link with icon support and polymorphic rendering capabilities.

**Attributes**:

- `href`: string - URL for navigation (optional when using polymorphic rendering)
- `startIcon`: IconName - Icon to display before text (optional)
- `endIcon`: IconName - Icon to display after text (optional)
- `disabled`: boolean - Disables the link (optional, default: false)
- `as`: React.ComponentType - Component to render as (optional, for polymorphic rendering)
- `children`: React.ReactNode - Link content (required)
- `className`: string - Additional CSS classes (optional)

**Relationships**:

- Wraps HeroUI Link component
- Uses IconNerux for icon rendering
- Applies design tokens for styling
- Supports polymorphic rendering via "as" prop

**Validation Rules**:

- If `as` prop provided, component must be a valid React component
- `startIcon` and `endIcon` must be valid IconName values from TablerIcons
- `href` required unless `as` prop provides navigation

**State Transitions**:

- Default → Disabled (when disabled prop is true)
- No other state transitions (stateless component)

### IconNerux Component

**Purpose**: Icon component that renders TablerIcons with design system styling.

**Attributes**:

- `name`: IconName - Icon identifier from TablerIcons (required)
- `size`: IconSize - Icon size variant (optional, default: "md")
- `color`: IconColor - Icon color variant (optional, default: "default")
- `stroke`: IconStroke - Icon stroke weight (optional, default: "regular")
- `className`: string - Additional CSS classes (optional)

**Relationships**:

- Used by LinkNerux for startIcon and endIcon rendering
- Located in src/components/web/icons/
- Applies design tokens for colors and sizing

**Validation Rules**:

- `name` must exist in TablerIcons export
- Size, color, stroke must be valid enum values

### HeroUI Link Component

**Purpose**: Base link component from HeroUI v3 providing accessibility and styling foundation.

**Attributes**:

- All standard HTML anchor element props
- HeroUI-specific props for styling and behavior
- `render` prop for custom element rendering
- Compound `Icon` component for icon positioning

**Relationships**:

- Base component wrapped by LinkNerux
- Provides Link.Icon for icon placement
- Handles accessibility features (ARIA, keyboard navigation)

## Data Flow

1. LinkNerux receives props from consumer
2. If `as` prop provided, uses polymorphic rendering
3. Otherwise, renders HeroUI Link with custom styling
4. Icons rendered using IconNerux inside Link.Icon wrappers
5. Design tokens applied via Tailwind CSS custom properties
6. Final component handles user interactions (click, keyboard)
