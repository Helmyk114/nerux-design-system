# Token System Contract

**Date**: 2026-04-11  
**Purpose**: Define interface contract for design token usage across components and themes

## Overview

The Nerux design system exposes a complete token API through CSS custom properties. This contract defines how tokens are named, scoped, and consumed by components.

## Token Naming Convention

### Format

```
--[category]-[element]-[state]
```

### Categories

- `color`: Color values (backgrounds, text, borders)
- `spacing`: Spacing values (padding, margin, gap)
- `border`: Border properties (width, radius)
- `shadow`: Shadow definitions
- `transition`: Animation timing
- `typography`: Font properties

### Elements

- Color: `primary`, `neutral`, `error`, `success`, `warning`, `info`
- Spacing: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
- Border: `width`, `radius`
- Shadow: `sm`, `md`, `lg`, `xl`
- Transition: `default`, `fast`, `slow`
- Typography: `family`, `size`, `weight`, `line-height`

### States

- Color: `bg-default`, `text-default`, `border-default`, `bg-hover`, `text-disabled`
- Others: `default` (omitted), `thin`, `thick`, `sm`, `md`, `lg`

### Examples

```css
--color-primary-bg-default: #8e05c2;
--spacing-md: 0.75rem;
--border-radius-md: 0.375rem;
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--transition-default: 200ms ease;
--typography-size-body: 14px;
```

## Theme Scoping Contract

### Light Theme

```css
:root[data-theme="light"] {
  /* All token definitions for light mode */
}
```

### Dark Theme

```css
:root[data-theme="dark"] {
  /* All token overrides for dark mode */
}
```

### Theme Switching

- Components must support `[data-theme="light|dark"]` attribute
- All theme-specific tokens must be defined in both themes
- Theme switching must not break component visuals

## Component Usage Contract

### CSS Class Integration

```css
.my-component {
  background-color: var(--color-primary-bg-default);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-default);
}
```

### Tailwind CSS Integration

```jsx
<div className="bg-(--color-primary-bg-default) p-(--spacing-md) rounded-(--border-radius-md)">
  Content
</div>
```

### TypeScript Integration

```typescript
type TokenSpacing = "xs" | "sm" | "md" | "lg" | "xl";

interface ComponentProps {
  spacing?: TokenSpacing;
}
```

## Token Completeness Contract

### Required Categories

All categories must be fully implemented:

- ✅ Colors: 12+ tokens (primary, neutral, semantic states)
- ✅ Typography: 8+ tokens (sizes, weights, family)
- ✅ Spacing: 6+ tokens (xs to xl scale)
- ✅ Borders: 6+ tokens (widths + radii)
- ✅ Shadows: 4+ tokens (depth hierarchy)
- ✅ Transitions: 3+ tokens (timing variants)

### Theme Coverage

- All tokens must exist in both light and dark themes
- Theme-specific values must maintain accessibility (contrast ratios)
- No token gaps between themes

## Validation Contract

### Build-Time Validation

- ESLint rules prevent hardcoded values
- TypeScript ensures token type safety
- CSS custom property references must resolve

### Runtime Validation

- Storybook stories validate visual correctness
- Theme switching tests ensure consistency
- Component props validate token usage

## Breaking Change Contract

### Semantic Versioning

- **MAJOR**: Removing tokens or changing values
- **MINOR**: Adding new tokens
- **PATCH**: Documentation updates or bug fixes

### Deprecation Process

```css
/* Deprecated - use --color-error instead */
--color-danger: #ff4d4d;
```

### Migration Timeline

- Deprecation warnings in development
- 2 release cycles for migration
- Clear upgrade guides provided

## Implementation Contract

### File Structure

```
src/token/
├── colors.css       # Color tokens
├── typography.css   # Typography tokens
├── spacing.css      # Spacing tokens (margins, padding, gaps)
├── borders.css      # Border tokens (widths, radiuses)
├── shadows.css      # Shadow tokens (box-shadows, elevations)
├── transitions.css  # Animation/transition tokens
└── index.css        # Imports all token files (existing, may need updates)
```

### Import Order

```css
@import "colors.css";
@import "typography.css";
@import "spacing.css";
@import "borders.css";
@import "shadows.css";
@import "transitions.css";
```

### Component Contract

Components MUST:

- Use only CSS custom properties for styling
- Not contain hardcoded Tailwind utilities
- Support theme switching
- Document token dependencies

This contract ensures the token system is complete, consistent, and maintainable across the entire design system.
