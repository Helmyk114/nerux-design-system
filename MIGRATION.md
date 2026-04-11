# Token Migration Guide

This guide helps migrate from hardcoded values and deprecated token patterns to the new Nerux Design System token system.

## Migration Overview

The token system provides 138 CSS custom properties across 6 categories with full light/dark theme support. Migration ensures consistent theming and maintainability.

## Quick Migration Checklist

- [ ] Audit components for hardcoded values
- [ ] Replace hardcoded colors with semantic tokens
- [ ] Replace hardcoded spacing with spacing scale
- [ ] Replace hardcoded shadows with shadow tokens
- [ ] Test in both light and dark themes
- [ ] Validate contrast ratios
- [ ] Update component documentation

## Color Migration

### Hardcoded Colors → Semantic Tokens

**Before:**

```css
.my-button {
  background-color: #8e05c2;
  color: #121212;
  border-color: #e5e5e5;
}
```

**After:**

```css
.my-button {
  background-color: var(--color-primary-bg-default);
  color: var(--color-primary-text-default);
  border-color: var(--color-border-default);
}
```

### Common Color Migrations

| Hardcoded Value | Token Replacement              | Notes                      |
| --------------- | ------------------------------ | -------------------------- |
| `#8e05c2`       | `--color-primary-bg-default`   | Primary brand color        |
| `#121212`       | `--color-primary-text-default` | Primary text (light theme) |
| `#f2f2f2`       | `--color-primary-text-default` | Primary text (dark theme)  |
| `#ededed`       | `--color-bg`                   | Page background (light)    |
| `#121212`       | `--color-bg`                   | Page background (dark)     |
| `#e5e5e5`       | `--color-border-default`       | Default borders            |
| `#32cd32`       | `--color-success-text-default` | Success color              |
| `#ff4d4d`       | `--color-error-text-default`   | Error color                |

## Spacing Migration

### Tailwind Classes → Token Variables

**Before:**

```html
<div class="p-4 m-2 gap-3"></div>
```

**After:**

```html
<div
  class="p-[var(--spacing-4)] m-[var(--spacing-2)] gap-[var(--spacing-3)]"
></div>
```

### Common Spacing Migrations

| Tailwind Class | Token Replacement  | Value          |
| -------------- | ------------------ | -------------- |
| `p-1`          | `--spacing-1`      | 0.25rem (4px)  |
| `p-2`          | `--spacing-2`      | 0.5rem (8px)   |
| `p-3`          | `--spacing-3`      | 0.75rem (12px) |
| `p-4`          | `--spacing-4`      | 1rem (16px)    |
| `p-6`          | `--spacing-6`      | 1.5rem (24px)  |
| `gap-4`        | `--spacing-gutter` | 1rem (16px)    |

## Border Migration

### Hardcoded Borders → Token System

**Before:**

```css
.my-input {
  border: 1px solid #e5e5e5;
  border-radius: 0.75rem;
}
```

**After:**

```css
.my-input {
  border: var(--border-width-default) solid var(--color-border-default);
  border-radius: var(--border-radius-lg);
}
```

### Border Migrations

| Hardcoded                 | Token Replacement                        |
| ------------------------- | ---------------------------------------- |
| `border: 1px`             | `border: var(--border-width-default)`    |
| `border: 0.2px`           | `border: var(--border-width-thin)`       |
| `border-radius: 0.75rem`  | `border-radius: var(--border-radius-lg)` |
| `border-radius: 0.375rem` | `border-radius: var(--border-radius-md)` |

## Shadow Migration

### Hardcoded Shadows → Token System

**Before:**

```css
.my-card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
}
```

**After:**

```css
.my-card {
  box-shadow: var(--shadow-md);
}
```

### Shadow Migrations

| Effect            | Token Replacement | Notes             |
| ----------------- | ----------------- | ----------------- |
| Subtle elevation  | `--shadow-sm`     | Small components  |
| Default elevation | `--shadow-md`     | Cards, buttons    |
| Large elevation   | `--shadow-lg`     | Modals, dropdowns |
| Maximum elevation | `--shadow-2xl`    | Highest priority  |

## Component-Specific Migrations

### Button Component

**Before:**

```tsx
<button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
  Click me
</button>
```

**After:**

```tsx
<button className="bg-[var(--color-primary-bg-default)] text-[var(--color-primary-text-default)] px-[var(--spacing-4)] py-[var(--spacing-2)] rounded-[var(--border-radius-lg)]">
  Click me
</button>
```

### Input Component

**Before:**

```tsx
<input className="border border-gray-300 rounded-lg px-3 py-2 focus:border-purple-600" />
```

**After:**

```tsx
<input className="border-[var(--border-width-default)] border-[var(--color-border-default)] rounded-[var(--border-radius-lg)] px-[var(--spacing-3)] py-[var(--spacing-2)] focus:border-[var(--color-primary-bg-default)]" />
```

### Card Component

**Before:**

```tsx
<div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
```

**After:**

```tsx
<div className="bg-[var(--color-surface-default)] border-[var(--border-width-default)] border-[var(--color-border-default)] rounded-[var(--border-radius-lg)] p-[var(--spacing-6)] shadow-[var(--shadow-md)]">
```

## Theme-Aware Migration

### Conditional Classes → Theme Attributes

**Before (Tailwind):**

```tsx
<div className="dark:bg-gray-900 dark:text-white">
```

**After (Tokens):**

```tsx
// CSS approach
<div className="bg-[var(--color-bg)] text-[var(--color-text-primary)]">

// Or JavaScript approach
<div data-theme={theme} className="bg-[var(--color-bg)] text-[var(--color-text-primary)]">
```

## Automated Migration Tools

### ESLint Rules for Prevention

Add these rules to prevent future hardcoded values:

```json
// .eslintrc.json
{
  "rules": {
    "no-hardcoded-colors": "error",
    "no-hardcoded-spacing": "error",
    "no-hardcoded-borders": "error",
    "no-hardcoded-shadows": "error"
  }
}
```

### Find and Replace Patterns

Use these regex patterns for bulk migration:

```regex
# Colors
#8e05c2 → var(--color-primary-bg-default)
#121212 → var(--color-primary-text-default)
#ededed → var(--color-bg)

# Spacing
p-4 → p-[var(--spacing-4)]
m-2 → m-[var(--spacing-2)]
gap-3 → gap-[var(--spacing-3)]

# Borders
border → border-[var(--border-width-default)]
rounded-lg → rounded-[var(--border-radius-lg)]

# Shadows
shadow-md → shadow-[var(--shadow-md)]
```

## Validation Steps

After migration, validate:

1. **Visual Consistency**: Check components in both themes
2. **Contrast Ratios**: Ensure WCAG AA compliance
3. **Build Success**: Verify CSS compilation
4. **TypeScript**: Check for type errors
5. **Storybook**: Test component stories

## Troubleshooting

### Token Not Applied

- Verify `src/index.css` imports all token files
- Check for typos in token names
- Ensure CSS custom property support

### Theme Not Switching

- Confirm `data-theme` attribute on document body
- Verify theme-specific token definitions
- Check CSS specificity conflicts

### Build Errors

- Ensure token files are in build pipeline
- Verify token syntax (`--token-name: value`)
- Check for circular token dependencies

## Rollback Strategy

If migration issues occur:

1. **Component Level**: Revert individual components
2. **File Level**: Restore backup of original files
3. **System Level**: Use git to revert token system changes

## Performance Considerations

- **CSS Custom Properties**: Minimal performance impact
- **Token Loading**: Load all tokens upfront for best performance
- **Theme Switching**: Instant theme changes via CSS variables

## Next Steps

1. Complete component migration
2. Update design system documentation
3. Train team on token usage
4. Establish token governance process
