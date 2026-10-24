# Migrating to 2.0

Version 2.0 makes `--nerux-*` the canonical token namespace, introduces the brand/theme runtime and replaces the hand-maintained token CSS files with generated artifacts.

Legacy token names continue to work as deprecated aliases. Most consumers only need to update imports and verify text placed on brand backgrounds.

## 1. Upgrade

```bash
pnpm add nerux-design-system@2.0.0
```

Import the compiled stylesheet once:

```ts
import "nerux-design-system/dist/nerux-design-system.css";
```

Remove any direct imports of the old token files (`colors.css`, `heroui-theme.css`, `typography.css`, `spacing.css`, `borders.css`, `shadows.css`, `transitions.css`). They are no longer shipped as source files; their variables are available through the compiled stylesheet and the generated aliases.

## 2. Token names

Use canonical names in new code:

| Legacy | Canonical |
| --- | --- |
| `--color-bg` | `--nerux-color-bg` |
| `--color-surface-default` | `--nerux-color-surface-default` |
| `--color-border-default` | `--nerux-color-border-default` |
| `--color-text-primary` | `--nerux-color-text-default` |
| `--color-text-secondary` | `--nerux-color-text-secondary` |
| `--color-primary-bg-default` | `--nerux-color-primary-bg-default` |
| `--color-error` | `--nerux-color-danger` |
| `--color-exito` | `--nerux-color-success` |
| `--color-advertencia` | `--nerux-color-warning` |
| `--color-informacion` | `--nerux-color-info` |
| `--spacing-4` | `--nerux-spacing-4` |
| `--border-radius-lg` | `--nerux-radius-lg` |
| `--font-size-body` | `--nerux-font-size-body` |
| `--font-weight-semibold` | `--nerux-font-weight-semibold` |

The complete mapping is generated in `src/token/generated/aliases.css`.

### Text on brand backgrounds

`--color-primary-text-default` historically meant body text, not “text on a primary background”. Its alias now points to `--nerux-color-text-default`.

If you render text on a primary or danger background, use:

```css
color: var(--nerux-color-primary-foreground);
```

This is the main source of visual changes in 2.0: primary and danger buttons now use a foreground chosen for the brand background instead of the body text color.

## 3. Add the theme provider

```tsx
import { NeruxProvider } from "nerux-design-system";

<NeruxProvider defaultTheme="system">
  <App />
</NeruxProvider>;
```

The provider sets `data-theme` and `data-brand` and listens to `prefers-color-scheme` for `system`. It is optional if your application already sets `data-theme` and `data-brand` itself.

For SSR, add `getThemeScript()` to `<head>` before the first paint. See [theming](theming.md).

## 4. Visual changes to review

- The Nerux brand palette is now violet: light `#7c3aed`, dark `#8b5cf6`. Hover, active, disabled and focus colors are derived from the base.
- Danger uses `#b91c1c` in the light theme to meet AA contrast on light surfaces.
- Primary and danger buttons use `--nerux-color-primary-foreground` instead of the body text token.
- HeroUI variables are mapped from the semantic tokens, so components without overrides follow the active theme and brand.
- Modal and Drawer headers now render a heading element, improving their accessible names.

## 5. Verify

```bash
pnpm tokens:check
pnpm test
pnpm build
pnpm build-storybook
```

Storybook runs axe with `a11y.test: "error"`, so contrast and accessible-name regressions fail CI.

## 6. Deprecations

Legacy aliases are supported for the 2.x line. They may be removed in 3.0. Prefer canonical `--nerux-*` names and the public `NeruxProvider`/`useNeruxTheme` API.

If you need a temporary rollback, see [rollback](rollback.md).
