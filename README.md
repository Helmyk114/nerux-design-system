# Nerux Design System

Component library and design-token foundation for Nerux products. Built with React 19, TypeScript, Tailwind CSS v4 and HeroUI v3.

## Install

```bash
pnpm add nerux-design-system
```

Peer dependencies: `react`, `react-dom`, `@heroui/react`, `@heroui/styles` and `tailwindcss`.

Import the compiled stylesheet once in your application entry point:

```ts
import "nerux-design-system/dist/nerux-design-system.css";
```

## Components

```tsx
import { ButtonNerux, InputNerux } from "nerux-design-system";

export function Example() {
  return (
    <form>
      <InputNerux name="Email" placeholder="you@example.com" />
      <ButtonNerux color="primary">Continue</ButtonNerux>
    </form>
  );
}
```

## Theming

Wrap the application with `NeruxProvider` and use `useNeruxTheme` to read or change the theme:

```tsx
import { NeruxProvider, useNeruxTheme } from "nerux-design-system";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useNeruxTheme();
  return (
    <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      Switch to {resolvedTheme === "dark" ? "light" : "dark"}
    </button>
  );
}

export function App() {
  return (
    <NeruxProvider defaultTheme="system">
      <ThemeToggle />
    </NeruxProvider>
  );
}
```

For SSR, inject `getThemeScript()` into `<head>` before the first paint to avoid a flash of the wrong theme. See [theming docs](docs/theming.md).

## Tokens

All CSS variables use the `--nerux-*` namespace. The legacy `--color-*`, `--spacing-*`, `--border-*`, `--shadow-*` and `--font-*` names remain available as deprecated aliases.

```css
.card {
  background: var(--nerux-color-surface-default);
  color: var(--nerux-color-text-default);
  border: 1px solid var(--nerux-color-border-default);
  border-radius: var(--nerux-radius-lg);
  padding: var(--nerux-spacing-4);
}
```

Tokens are generated from `src/token/source/`. Do not edit `src/token/generated/` by hand. See [token docs](docs/tokens.md).

## Scripts

```bash
pnpm tokens:build      # regenerate CSS and TypeScript token artifacts
pnpm tokens:check      # fail if generated artifacts are stale or contrast checks fail
pnpm dev               # Vite playground
pnpm storybook         # component and theme stories
pnpm test              # unit tests + Storybook interaction/a11y tests
pnpm test:coverage     # coverage report
pnpm lint              # ESLint
pnpm build             # library build
pnpm build-storybook   # static Storybook
```

## Documentation

- [Tokens](docs/tokens.md)
- [Theming and brands](docs/theming.md)
- [Migration to 2.0](docs/migration-2.0.md)
- [Rollback](docs/rollback.md)
- [Changelog](CHANGELOG.md)
