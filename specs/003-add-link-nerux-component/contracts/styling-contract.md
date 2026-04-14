# Styling Contract: LinkNerux

**Contract Type**: CSS Classes and Design Tokens
**Date**: 13 de abril de 2026

## Design Token Dependencies

### Colors

- `--color-link-default`: Default link color
- `--color-link-hover`: Link color on hover
- `--color-link-focus`: Link color on focus
- `--color-link-disabled`: Disabled link color
- `--color-link-visited`: Visited link color (if applicable)

### Typography

- `--font-family-link`: Link font family
- `--font-size-link`: Link font size
- `--font-weight-link`: Link font weight
- `--line-height-link`: Link line height

### Spacing

- `--spacing-link-padding-x`: Horizontal padding
- `--spacing-link-padding-y`: Vertical padding
- `--spacing-link-icon-gap`: Gap between icon and text

### Borders

- `--border-radius-link`: Link border radius
- `--border-width-link-focus`: Focus ring width

### Shadows

- `--shadow-link-focus`: Focus shadow effect

## CSS Classes Applied

### Base Classes (from HeroUI)

- `link`: Base link styling
- `link--default`: Default variant
- `link--disabled`: Disabled variant

### Icon Classes (from HeroUI)

- `link__icon`: Icon container
- `link__icon--start`: Start icon positioning
- `link__icon--end`: End icon positioning

### Nerux Custom Classes

- `link-nerux`: Component-specific styling
- `link-nerux--with-start-icon`: Modifier when startIcon present
- `link-nerux--with-end-icon`: Modifier when endIcon present

## Tailwind CSS Classes

### Default State

```css
@apply text-(--color-link-default) underline decoration-(--color-link-default) underline-offset-2;
@apply hover:text-(--color-link-hover) hover:decoration-(--color-link-hover);
@apply focus:outline-none focus:ring-2 focus:ring-(--color-link-focus) focus:ring-offset-2;
@apply transition-colors duration-200 ease-in-out;
```

### Disabled State

```css
@apply text-(--color-link-disabled) underline decoration-(--color-link-disabled);
@apply cursor-not-allowed opacity-60;
@apply pointer-events-none;
```

### Icon Spacing

```css
@apply gap-(--spacing-link-icon-gap);
```

## Theme Support

### Light Mode

- Uses default token values
- High contrast ratios for accessibility

### Dark Mode

- Automatic token switching via `[data-theme="dark"]`
- Adjusted colors for dark backgrounds

## Responsive Design

- Font sizes scale with viewport (if tokens define responsive values)
- Touch targets meet minimum 44px requirement on mobile
- Icon sizes adjust appropriately

## Animation/Transitions

- Color transitions: 200ms ease-in-out
- Focus ring: Instant appearance
- Hover effects: Smooth transitions

## No Hardcoded Values

- All styling uses design tokens exclusively
- No magic numbers or hardcoded colors
- Token values defined in src/token/\*.css files
- Tailwind custom property syntax: `text-(--color-link-default)`

## Icon Styling Integration

- Icons inherit link color via currentColor
- Icon sizes: sm (16px) for links
- Icon stroke weights: regular (1.5)
- Icons positioned via HeroUI Link.Icon component
