# Nerux Design System - Token Usage Guide

## Overview

This document provides comprehensive guidance for using the Nerux Design System token system. The token system consists of 138 CSS custom properties organized across 6 categories, with full light/dark theme support.

## Token Categories

### 1. Colors (`colors.css`)

Semantic color tokens for consistent theming across components.

**Usage:**

```css
.my-component {
  background-color: var(--color-primary-bg-default);
  color: var(--color-primary-text-default);
  border-color: var(--color-border-default);
}
```

**Available Colors:**

- `--color-primary-*`: Brand primary colors
- `--color-secondary-*`: Secondary accent colors
- `--color-success-*`: Success state colors
- `--color-warning-*`: Warning state colors
- `--color-error-*`: Error state colors
- `--color-info-*`: Information state colors
- `--color-bg`: Page background
- `--color-surface-*`: Component surface colors
- `--color-border-*`: Border colors
- `--color-text-*`: Text colors

### 2. Spacing (`spacing.css`)

Consistent spacing scale for margins, padding, and gaps.

**Usage:**

```css
.my-component {
  padding: var(--spacing-4);
  margin-bottom: var(--spacing-6);
  gap: var(--spacing-gutter);
}
```

**Scale:**

- `--spacing-xs`: 0.5rem (8px)
- `--spacing-sm`: 0.75rem (12px)
- `--spacing-md`: 1rem (16px)
- `--spacing-lg`: 1.5rem (24px)
- `--spacing-xl`: 2rem (32px)
- `--spacing-2xl`: 3rem (48px)
- `--spacing-gutter`: 1rem (16px) - default component spacing

### 3. Borders (`borders.css`)

Border width and radius definitions.

**Usage:**

```css
.my-input {
  border-width: var(--border-width-thin);
  border-radius: var(--border-radius-lg);
}
```

**Widths:**

- `--border-width-thin`: 0.2px
- `--border-width-default`: 1px
- `--border-width-thick`: 2px

**Radii:**

- `--border-radius-sm`: 0.25rem
- `--border-radius-md`: 0.375rem
- `--border-radius-lg`: 0.75rem
- `--border-radius-xl`: 1rem

### 4. Shadows (`shadows.css`)

Elevation system with theme-aware shadows.

**Usage:**

```css
.my-card {
  box-shadow: var(--shadow-md);
}
```

**Sizes:**

- `--shadow-sm`: Small elevation
- `--shadow-md`: Medium elevation (default)
- `--shadow-lg`: Large elevation
- `--shadow-xl`: Extra large elevation
- `--shadow-2xl`: Maximum elevation

### 5. Transitions (`transitions.css`)

Animation timing and easing functions.

**Usage:**

```css
.my-button {
  transition: all var(--transition-default);
}
```

**Available Transitions:**

- `--transition-default`: 150ms ease-in-out
- `--transition-fast`: 100ms ease-in-out
- `--transition-slow`: 300ms ease-in-out
- `--ease-*`: Individual easing functions

### 6. Typography (`typography.css`)

Font family, size, and weight definitions.

**Usage:**

```css
.my-heading {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
}
```

## Theme Support

All color and shadow tokens automatically adapt to light/dark themes via CSS custom properties.

**Light Theme** (default):

```html
<body data-theme="light">
  <!-- Uses light theme tokens -->
</body>
```

**Dark Theme**:

```html
<body data-theme="dark">
  <!-- Uses dark theme tokens -->
</body>
```

**Theme Switching:**

```javascript
// Switch to dark theme
document.body.setAttribute("data-theme", "dark");

// Switch to light theme
document.body.setAttribute("data-theme", "light");
```

## Component Integration

### Tailwind CSS Integration

Use Tailwind's arbitrary value syntax to reference tokens:

```html
<!-- Colors -->
<div
  class="bg-[var(--color-primary-bg-default)] text-[var(--color-primary-text-default)]"
>
  <!-- Spacing -->
  <div class="p-[var(--spacing-4)] gap-[var(--spacing-gutter)]">
    <!-- Borders -->
    <input
      class="border-[var(--border-width-thin)] rounded-[var(--border-radius-lg)]"
    />

    <!-- Shadows -->
    <div class="shadow-[var(--shadow-md)]"></div>
  </div>
</div>
```

### React Component Example

```tsx
import { clsx } from "clsx";

interface ButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export function ButtonNerux({ variant = "primary", children }: ButtonProps) {
  return (
    <button
      className={clsx(
        // Base styles using tokens
        "bg-[var(--color-primary-bg-default)]",
        "text-[var(--color-primary-text-default)]",
        "border-[var(--border-width-thin)]",
        "rounded-[var(--border-radius-lg)]",
        "shadow-[var(--shadow-sm)]",
        "p-[var(--spacing-3)]",
        "transition-[var(--transition-default)]",

        // Variant styles
        {
          "bg-[var(--color-primary-bg-default)]": variant === "primary",
          "bg-[var(--color-secondary-bg-default)]": variant === "secondary",
        },
      )}
    >
      {children}
    </button>
  );
}
```

## Migration Guide

### From Hardcoded Values

**Before:**

```css
.my-component {
  background-color: #8e05c2;
  color: #121212;
  border: 1px solid #e5e5e5;
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
}
```

**After:**

```css
.my-component {
  background-color: var(--color-primary-bg-default);
  color: var(--color-primary-text-default);
  border: var(--border-width-default) solid var(--color-border-default);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-4);
  box-shadow: var(--shadow-md);
}
```

### From Tailwind Utilities

**Before:**

```html
<div class="bg-purple-600 text-white border rounded-lg p-4 shadow-md"></div>
```

**After:**

```html
<div
  class="bg-[var(--color-primary-bg-default)] text-[var(--color-primary-text-default)] border-[var(--border-width-default)] border-[var(--color-border-default)] rounded-[var(--border-radius-lg)] p-[var(--spacing-4)] shadow-[var(--shadow-md)]"
></div>
```

## Best Practices

1. **Always use tokens** instead of hardcoded values
2. **Test in both themes** to ensure proper contrast
3. **Use semantic color names** (primary, success, error) over generic names
4. **Leverage the spacing scale** for consistent rhythm
5. **Combine tokens with Tailwind** for rapid development

## Accessibility

All color combinations meet WCAG AA contrast requirements:

- Normal text: 4.5:1 minimum contrast ratio
- Large text: 3:1 minimum contrast ratio
- Interactive elements: 3:1 minimum contrast ratio

## Development Tools

### ESLint Rules

Use the token validation ESLint rules to prevent hardcoded values:

```json
{
  "rules": {
    "no-hardcoded-colors": "error",
    "no-hardcoded-spacing": "error",
    "no-hardcoded-shadows": "error"
  }
}
```

### Storybook Integration

All components include theme switching controls for visual testing:

```typescript
// .storybook/preview.ts
export const globalTypes = {
  theme: {
    name: "Theme",
    defaultValue: "light",
    toolbar: {
      items: ["light", "dark"],
    },
  },
};
```

## Troubleshooting

### Token Not Applied

- Verify token file is imported in `src/index.css`
- Check for typos in token names
- Ensure component supports CSS custom properties

### Theme Not Switching

- Confirm `data-theme` attribute is set on document body
- Verify theme-specific token definitions exist
- Check for CSS specificity conflicts

### Build Issues

- Ensure all token files are included in build process
- Verify CSS custom property support in target browsers
- Check for circular dependencies in token definitions

## Version History

- **v1.0.0**: Initial token system with 138 tokens
- **v1.1.0**: Added theme switching support
- **v1.2.0**: Enhanced accessibility compliance
