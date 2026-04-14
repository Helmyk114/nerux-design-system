# Public API Contract: LinkNerux

**Contract Type**: Component Props Interface
**Date**: 13 de abril de 2026

## Interface Definition

```typescript
interface LinkNeruxProps extends Omit<LinkProps, "variant" | "color" | "size"> {
  /**
   * Icon to display before the link text
   * Must be a valid IconName from TablerIcons
   */
  startIcon?: IconName;

  /**
   * Icon to display after the link text
   * Must be a valid IconName from TablerIcons
   */
  endIcon?: IconName;

  /**
   * Component to render as (polymorphic rendering)
   * Allows LinkNerux to be rendered as different components (e.g., RouterLink)
   */
  as?: React.ComponentType<any>;

  /**
   * Whether the link is disabled
   * When true, prevents navigation and applies disabled styling
   */
  disabled?: boolean;

  /**
   * Link content (text, elements)
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}
```

## Props Contract

### Required Props

- `children`: React.ReactNode - The link content to display

### Optional Props

- `href`: string - Navigation URL (inherited from HeroUI Link)
- `startIcon`: IconName - Icon before text
- `endIcon`: IconName - Icon after text
- `as`: React.ComponentType - Polymorphic component
- `disabled`: boolean - Disable state
- `className`: string - Additional styling

### Inherited Props

All HeroUI Link props except 'variant', 'color', 'size' are supported and forwarded.

## Usage Contract

### Basic Usage

```typescript
<LinkNerux href="/path">Link Text</LinkNerux>
```

### With Icons

```typescript
<LinkNerux href="/path" startIcon="arrow-left" endIcon="external-link">
  Link Text
</LinkNerux>
```

### Polymorphic Rendering

```typescript
<LinkNerux as={RouterLink} to="/path">Link Text</LinkNerux>
```

### Disabled State

```typescript
<LinkNerux href="/path" disabled>Link Text</LinkNerux>
```

## Breaking Changes

- Any removal or renaming of props constitutes a breaking change
- Changes to prop types may be breaking if they narrow the accepted values
- Addition of required props is a breaking change
