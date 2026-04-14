# Quickstart: LinkNerux Component

**Date**: 13 de abril de 2026
**Component**: LinkNerux
**Location**: src/components/web/link/

## Installation

LinkNerux is part of the Nerux Design System. Import from the main package:

```typescript
import { LinkNerux } from "@nerux/design-system";
```

## Basic Usage

### Simple Link

```tsx
import { LinkNerux } from "@nerux/design-system";

function MyComponent() {
  return <LinkNerux href="/about">About Us</LinkNerux>;
}
```

### With Icons

```tsx
import { LinkNerux } from "@nerux/design-system";

function MyComponent() {
  return (
    <LinkNerux href="/external" endIcon="external-link">
      Visit Website
    </LinkNerux>
  );
}
```

## Advanced Usage

### Polymorphic Rendering with React Router

```tsx
import { Link as RouterLink } from "react-router-dom";
import { LinkNerux } from "@nerux/design-system";

function MyComponent() {
  return (
    <LinkNerux as={RouterLink} to="/dashboard">
      Go to Dashboard
    </LinkNerux>
  );
}
```

### With Multiple Icons

```tsx
import { LinkNerux } from "@nerux/design-system";

function MyComponent() {
  return (
    <LinkNerux href="/download" startIcon="download" endIcon="arrow-right">
      Download File
    </LinkNerux>
  );
}
```

### Disabled State

```tsx
import { LinkNerux } from "@nerux/design-system";

function MyComponent() {
  const isLoading = true;

  return (
    <LinkNerux href="/submit" disabled={isLoading}>
      {isLoading ? "Submitting..." : "Submit Form"}
    </LinkNerux>
  );
}
```

## Context Usage Examples

### Inline in Text

```tsx
<p>
  For more information, see our{" "}
  <LinkNerux href="/docs">documentation</LinkNerux>.
</p>
```

### In Navigation Menus

```tsx
<nav>
  <ul>
    <li>
      <LinkNerux href="/home">Home</LinkNerux>
    </li>
    <li>
      <LinkNerux href="/about" endIcon="chevron-right">
        About
      </LinkNerux>
    </li>
    <li>
      <LinkNerux href="/contact">Contact</LinkNerux>
    </li>
  </ul>
</nav>
```

### In Tables

```tsx
<table>
  <tbody>
    <tr>
      <td>Project Alpha</td>
      <td>
        <LinkNerux href="/projects/alpha" endIcon="external-link">
          View Details
        </LinkNerux>
      </td>
    </tr>
  </tbody>
</table>
```

### In Cards

```tsx
<div className="card">
  <h3>Featured Article</h3>
  <p>Learn about our latest features...</p>
  <LinkNerux href="/articles/featured" endIcon="arrow-right">
    Read More
  </LinkNerux>
</div>
```

## Available Icons

LinkNerux supports all icons from Tabler Icons. Common examples:

- `arrow-left`, `arrow-right`, `chevron-left`, `chevron-right`
- `external-link`, `download`, `upload`
- `home`, `settings`, `user`, `search`
- `plus`, `minus`, `edit`, `trash`

See the IconNerux documentation for the complete list.

## Props Reference

| Prop        | Type            | Default | Description             |
| ----------- | --------------- | ------- | ----------------------- |
| `href`      | `string`        | -       | Navigation URL          |
| `children`  | `ReactNode`     | -       | Link content (required) |
| `startIcon` | `IconName`      | -       | Icon before text        |
| `endIcon`   | `IconName`      | -       | Icon after text         |
| `as`        | `ComponentType` | -       | Polymorphic component   |
| `disabled`  | `boolean`       | `false` | Disable the link        |
| `className` | `string`        | -       | Additional CSS classes  |

## Styling

LinkNerux uses design tokens for all styling. Customize via CSS custom properties:

```css
:root {
  --color-link-default: #0066cc;
  --color-link-hover: #004499;
  --color-link-disabled: #cccccc;
}
```

## TypeScript Support

LinkNerux is fully typed. Use with TypeScript for best developer experience:

```tsx
import { LinkNerux, type LinkNeruxProps } from "@nerux/design-system";

interface CustomLinkProps extends LinkNeruxProps {
  customProp: string;
}
```

## Storybook

View all LinkNerux variants and examples in Storybook:

```bash
npm run storybook
```

Navigate to "Design System/LinkNerux" section.
