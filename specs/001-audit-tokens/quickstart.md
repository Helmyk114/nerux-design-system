# Quickstart: Design System Token System

**Date**: 2026-04-11  
**Purpose**: Guide for using the complete Nerux design system token system

## Overview

The Nerux design system provides a complete token-based styling system. All visual attributes are defined as CSS custom properties, ensuring consistency and maintainability.

## Setup

### 1. Import Tokens

Add to your CSS entry point:

```css
@import "@nerux-design-system/tokens";
```

Or import individual categories:

```css
@import "@nerux-design-system/tokens/colors";
@import "@nerux-design-system/tokens/typography";
@import "@nerux-design-system/tokens/spacing";
@import "@nerux-design-system/tokens/borders";
@import "@nerux-design-system/tokens/shadows";
@import "@nerux-design-system/tokens/transitions";
```

### 2. Enable Theme Support

Add theme attribute to your root element:

```html
<html data-theme="light">
  <!-- or "dark" -->
  <body>
    <!-- Your app content -->
  </body>
</html>
```

### 3. Theme Switching

```javascript
// Switch to dark theme
document.documentElement.setAttribute("data-theme", "dark");

// Switch to light theme
document.documentElement.setAttribute("data-theme", "light");
```

## Using Tokens

### Colors

```css
.primary-button {
  background-color: var(--color-primary-bg-default);
  color: var(--color-primary-text-default);
  border: 1px solid var(--color-primary-border-default);
}

.primary-button:hover {
  background-color: var(--color-primary-bg-hover);
}

.error-text {
  color: var(--color-error);
}
```

### Spacing

```css
.card {
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  gap: var(--spacing-sm);
}
```

### Borders

```css
.input {
  border: var(--border-width-thin) solid var(--color-border-default);
  border-radius: var(--border-radius-md);
}
```

### Shadows

```css
.modal {
  box-shadow: var(--shadow-lg);
}

.card {
  box-shadow: var(--shadow-sm);
}
```

### Typography

```css
.heading {
  font-family: var(--typography-family-base);
  font-size: var(--typography-size-title);
  font-weight: var(--typography-weight-bold);
  line-height: var(--typography-line-height-title);
}

.body-text {
  font-size: var(--typography-size-body);
  line-height: var(--typography-line-height-body);
}
```

### Transitions

```css
.button {
  transition: all var(--transition-default);
}
```

## Tailwind CSS Integration

Use tokens with Tailwind's arbitrary value syntax:

```jsx
<div className="bg-(--color-primary-bg-default) text-(--color-primary-text-default) p-(--spacing-md) rounded-(--border-radius-md) shadow-(--shadow-sm)">
  Styled with tokens
</div>
```

## Component Usage

### Button Component

```jsx
import { ButtonNerux } from "@nerux-design-system";

<ButtonNerux color="primary" size="md">
  Primary Button
</ButtonNerux>;
```

### Input Component

```jsx
import { InputNerux } from "@nerux-design-system";

<InputNerux name="email" type="email" placeholder="Enter your email" />;
```

### Card Component

```jsx
import {
  CardNerux,
  CardHeaderNerux,
  CardTitleNerux,
  CardContentNerux,
} from "@nerux-design-system";

<CardNerux>
  <CardHeaderNerux>
    <CardTitleNerux>Card Title</CardTitleNerux>
  </CardHeaderNerux>
  <CardContentNerux>Card content goes here</CardContentNerux>
</CardNerux>;
```

## Custom Styling

### Creating Custom Components

```jsx
import { cn } from 'clsx';

interface CustomButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

function CustomButton({ variant = 'primary', children }: CustomButtonProps) {
  return (
    <button
      className={cn(
        "px-(--spacing-md) py-(--spacing-sm) rounded-(--border-radius-md) font-(--typography-weight-medium)",
        variant === 'primary' && "bg-(--color-primary-bg-default) text-(--color-primary-text-default)",
        variant === 'secondary' && "bg-(--color-neutral-bg-default) text-(--color-primary-text-default)"
      )}
    >
      {children}
    </button>
  );
}
```

### Theme-Aware Components

```jsx
function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-(--spacing-sm) rounded-(--border-radius-md) bg-(--color-surface-default) border-(--border-width-thin) border-(--color-border-default)"
    >
      Toggle to {theme === "light" ? "dark" : "light"} theme
    </button>
  );
}
```

## TypeScript Integration

### Token Types

```typescript
type TokenColor = "primary" | "neutral" | "error" | "success";
type TokenSpacing = "xs" | "sm" | "md" | "lg" | "xl";
type TokenBorderRadius = "none" | "sm" | "md" | "lg" | "full";

interface ComponentProps {
  color?: TokenColor;
  spacing?: TokenSpacing;
  borderRadius?: TokenBorderRadius;
}
```

### Type-Safe Components

```typescript
interface ButtonProps {
  color: TokenColor;
  size: TokenSpacing;
  children: React.ReactNode;
}

function Button({ color, size, children }: ButtonProps) {
  return (
    <button className={`bg-(--color-${color}-bg-default) p-(--spacing-${size})`}>
      {children}
    </button>
  );
}
```

## Best Practices

### 1. Never Use Hardcoded Values

❌ Wrong:

```css
.button {
  background-color: #8e05c2;
  padding: 12px;
}
```

✅ Correct:

```css
.button {
  background-color: var(--color-primary-bg-default);
  padding: var(--spacing-md);
}
```

### 2. Use Semantic Token Names

Choose tokens based on purpose, not appearance:

```css
/* Use semantic names */
.success-message {
  color: var(--color-success);
}

/* Avoid appearance-based names */
.green-text {
  color: var(--color-success); /* Wrong - what if success color changes? */
}
```

### 3. Test Theme Switching

Always test components in both light and dark themes:

```javascript
// In Storybook or tests
describe("Button", () => {
  it("renders correctly in light theme", () => {
    // Test with data-theme="light"
  });

  it("renders correctly in dark theme", () => {
    // Test with data-theme="dark"
  });
});
```

### 4. Document Token Usage

```jsx
/**
 * Button component that uses the following tokens:
 * - --color-primary-bg-default: Background color
 * - --color-primary-text-default: Text color
 * - --spacing-md: Padding
 * - --border-radius-md: Border radius
 * - --shadow-sm: Box shadow
 */
function Button() {
  // Implementation
}
```

## Troubleshooting

### Token Not Applied

- Check if token is imported in your CSS
- Verify theme attribute is set on html element
- Ensure CSS custom property name is correct

### Theme Not Switching

- Confirm `[data-theme]` attribute is on document.documentElement
- Check that all tokens are defined in both themes
- Verify CSS selectors target `[data-theme="light"]` and `[data-theme="dark"]`

### TypeScript Errors

- Import token types from the design system
- Use provided type definitions for component props
- Check that token names match TypeScript interfaces

## Migration Guide

### From Hardcoded Values

1. Identify hardcoded values in your components
2. Find corresponding tokens in the token system
3. Replace hardcoded values with `var(--token-name)`
4. Test visual appearance remains the same
5. Remove any unused CSS

### From Previous Token System

1. Update import statements to new token files
2. Check for renamed tokens in migration guide
3. Update theme switching logic if changed
4. Test all components for visual regressions

This quickstart guide covers the essentials for using the Nerux design system token system effectively.
