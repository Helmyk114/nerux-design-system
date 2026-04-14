# Rendering Contract: LinkNerux

**Contract Type**: DOM Output Specification
**Date**: 13 de abril de 2026

## Default Rendering (href prop)

When `href` prop is provided and no `as` prop:

```html
<a href="/path" class="[hero-ui-classes] [nerux-classes]">
  <!-- startIcon if provided -->
  <span class="[hero-ui-link-icon-classes]">
    <svg class="[icon-classes]">...</svg>
  </span>

  <!-- children -->
  <span>Link Text</span>

  <!-- endIcon if provided -->
  <span class="[hero-ui-link-icon-classes]">
    <svg class="[icon-classes]">...</svg>
  </span>
</a>
```

## Polymorphic Rendering (as prop)

When `as` prop is provided:

```html
<CustomComponent
  href="/path"
  class="[hero-ui-classes] [nerux-classes]"
  ...otherProps
>
  <!-- startIcon if provided -->
  <span class="[hero-ui-link-icon-classes]">
    <svg class="[icon-classes]">...</svg>
  </span>

  <!-- children -->
  <span>Link Text</span>

  <!-- endIcon if provided -->
  <span class="[hero-ui-link-icon-classes]">
    <svg class="[icon-classes]">...</svg>
  </span>
</CustomComponent>
```

## Element Structure Contract

### Root Element

- **Default**: `<a>` element with href attribute
- **Polymorphic**: Custom component specified by `as` prop
- **Always includes**: HeroUI Link classes + Nerux custom classes

### Icon Containers

- **Wrapper**: `<span>` with HeroUI Link.Icon classes
- **Icon**: `<svg>` element from IconNerux (TablerIcons)
- **Positioning**: Automatic via HeroUI Link.Icon component

### Content

- **Container**: Direct children of root element
- **Type**: Any valid React node (text, elements, fragments)

## CSS Classes Contract

### Applied Classes

- HeroUI base Link classes (theme-aware)
- Nerux variant classes (default/disabled)
- Custom classes from `className` prop
- Icon-specific classes from IconNerux

### Class Precedence

1. HeroUI base classes (lowest priority)
2. Nerux variant classes
3. Custom `className` prop (highest priority)

## Accessibility Contract

### ARIA Attributes

- Inherits all ARIA attributes from HeroUI Link
- Disabled state: `aria-disabled="true"` when disabled
- Screen reader support via HeroUI foundation

### Keyboard Navigation

- Inherits keyboard handling from HeroUI Link
- Tab navigation support
- Enter/Space activation

### Focus Management

- Visible focus indicators via HeroUI styling
- Focus ring styling from design tokens

## State Variations

### Default State

- Standard link styling
- Hover/focus states from HeroUI
- Clickable and navigable

### Disabled State

- `pointer-events: none` applied
- Reduced opacity via design tokens
- No navigation on click
- Visual indication of disabled state

## Browser Compatibility

- Inherits HeroUI's browser support
- Requires CSS custom properties support (modern browsers)
- React 19+ compatible
- TypeScript strict mode required
