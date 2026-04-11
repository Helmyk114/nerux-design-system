# Data Model: Design System Token Audit & Completion

**Date**: 2026-04-11  
**Phase**: 1 (Design)  
**Input**: Research findings from research.md

## Overview

The design system token ecosystem consists of hierarchical entities that define visual identity, component behavior, and theme management. All entities are interconnected through CSS custom properties and component implementations.

## Core Entities

### Token

**Definition**: A CSS custom property that defines a single visual attribute value
**Attributes**:

- `name`: CSS variable name (e.g., `--color-primary-bg-default`)
- `value`: Concrete value (e.g., `#8e05c2`, `0.5rem`, `0 1px 2px rgba(0,0,0,0.05)`)
- `category`: Reference to TokenCategory
- `theme`: Reference to Theme (null for theme-agnostic tokens)
- `description`: Human-readable purpose
- `deprecated`: Boolean flag for migration tracking

**Relationships**:

- Belongs to one TokenCategory
- May belong to one Theme (for theme-specific overrides)
- Referenced by Components via CSS class usage
- Used in Stories for visual validation

**Constraints**:

- Name follows `--[category]-[element]-[state]` convention
- Value is theme-specific when theme is defined
- No duplicate names within same theme scope

### TokenCategory

**Definition**: Logical grouping of related design tokens
**Attributes**:

- `name`: Category identifier (colors, typography, spacing, borders, shadows, transitions)
- `description`: Purpose and usage guidelines
- `required`: Boolean indicating if category must be complete

**Relationships**:

- Contains multiple Tokens
- Referenced by Components for styling requirements

**Instances**:

- Colors: Semantic and brand color values
- Typography: Font families, sizes, weights, line heights
- Spacing: Padding, margin, gap values
- Borders: Width, radius, style definitions
- Shadows: Elevation and depth definitions
- Transitions: Animation timing and easing

### Theme

**Definition**: Complete set of token overrides for visual mode
**Attributes**:

- `name`: Theme identifier (light, dark)
- `selector`: CSS selector for application (`[data-theme="light"]`)
- `description`: When and how theme is applied

**Relationships**:

- Contains multiple Tokens (theme-specific overrides)
- Applied to Components via data-theme attribute
- Validated by Stories across theme variants

**Constraints**:

- All theme-specific tokens must have both light and dark variants
- Theme switching must not break component visuals

### Component

**Definition**: React wrapper component using HeroUI primitives with Nerux styling
**Attributes**:

- `name`: Component identifier (ButtonNerux, InputNerux)
- `heroUiPrimitive`: Underlying HeroUI component (Button, TextField)
- `tokensUsed`: Array of Token references for styling
- `variants`: Supported visual variants (primary, danger, disabled)

**Relationships**:

- Uses multiple Tokens for visual attributes
- Contains Stories for documentation and testing
- Belongs to Platform (web, mobile)

**Constraints**:

- Must not contain hardcoded Tailwind utilities
- All styling via CSS custom properties
- Extends HeroUI props without conflicting overrides

### Story

**Definition**: Storybook story demonstrating component usage and variants
**Attributes**:

- `title`: Storybook title path
- `component`: Reference to Component
- `args`: Story arguments for variant demonstration
- `themes`: Array of Theme references for validation

**Relationships**:

- Belongs to one Component
- Validates multiple Themes
- Uses Tokens indirectly through Component styling

**Constraints**:

- Must render without visual regressions
- Covers all meaningful component variants
- Tests theme switching compatibility

### DesignAsset

**Definition**: External design reference for token validation
**Attributes**:

- `source`: Origin (Figma, design system docs)
- `reference`: URL or file path
- `tokensMapped`: Array of Token references validated against asset

**Relationships**:

- Maps to multiple Tokens for validation
- Supplementary to Stories for visual accuracy

**Constraints**:

- Used for validation, not as primary source of truth
- Stories take precedence over design assets

## Entity Relationships

```
DesignAsset -- validates --> Token
    ↓
Story -- tests --> Component -- uses --> Token
    ↓                           ↓
Theme -- overrides --> Token     Token -- belongs to --> TokenCategory
```

## Data Flow

1. **Token Definition**: Tokens created in CSS files with category organization
2. **Theme Application**: Theme selectors override base token values
3. **Component Styling**: Components reference tokens via CSS custom properties
4. **Story Validation**: Stories demonstrate components across themes
5. **Asset Verification**: Design assets validate token implementation

## Validation Rules

### Token Completeness

- Every visual attribute used by Components must have corresponding Token
- All Tokens in required categories must be defined
- Theme-specific tokens must exist for both light and dark modes

### Consistency Rules

- Token names follow strict naming convention
- Token values are consistent within categories (e.g., spacing scale)
- Component token usage is documented and auditable

### Integrity Rules

- No hardcoded values in Component implementations
- All token references are valid and resolvable
- Theme switching preserves component functionality

## Migration Considerations

### Existing Components

- Audit current hardcoded utilities (`border-[0.2px]`, `rounded-lg`, etc.)
- Map hardcoded values to appropriate tokens
- Update component implementations to use token references

### Token Evolution

- Add new tokens without modifying existing values
- Deprecate tokens with clear migration paths
- Maintain backward compatibility during transition

### Theme Expansion

- Ensure all new tokens have complete theme coverage
- Test theme switching across all components
- Validate contrast and accessibility requirements

## Implementation Notes

- **Storage**: All entities stored as CSS files and TypeScript code
- **Validation**: Storybook + Vitest provides automated integrity checking
- **Governance**: Constitution principles enforce token system compliance
- **Evolution**: Semantic versioning ensures predictable token lifecycle
