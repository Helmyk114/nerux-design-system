# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and [Semantic Versioning](https://semver.org/).

## [2.0.0] - 2026-10-24

### Added

- Single-source token pipeline in `src/token/source/` with deterministic CSS and TypeScript generation.
- Canonical `--nerux-*` token namespace for color, spacing, radius, typography, borders, shadows and transitions.
- Generated legacy aliases for the existing `--color-*`, `--spacing-*`, `--border-*`, `--shadow-*` and `--font-*` names.
- Light and dark semantic themes, including success, warning, danger, info, surfaces, borders, text and states.
- Nerux brand palette and native CSS brand scale derivation with `color-mix(in oklch, ...)`.
- `NeruxProvider`, `useNeruxTheme`, `getThemeScript` and public theme/brand types.
- Configurable persistence, controlled and uncontrolled themes, `system` mode and `prefers-color-scheme` syncing.
- Custom brands with primary color, foreground, logos and favicon.
- SSR anti-FOUC script with idempotent favicon handling.
- Storybook theme and custom-brand stories, brand toolbar selector and theme × brand matrix.
- Unit, generation, contrast, SSR, storage and Storybook a11y tests.
- CI workflow running token checks, lint, build, tests and Storybook build.
- Token, theming, migration and rollback documentation.

### Changed

- `--nerux-*` is now the canonical token namespace.
- The Nerux brand palette is now violet: `#7c3aed` in light and `#8b5cf6` in dark.
- Danger in the light theme is `#b91c1c` for AA contrast.
- Primary and danger buttons use `--nerux-color-primary-foreground`.
- `--color-primary-text-default` now aliases body text (`--nerux-color-text-default`), matching its historical use.
- Modal and Drawer headers render a heading element.
- Storybook a11y checks run as errors instead of todos.

### Removed

- Hand-maintained token CSS source files (`colors.css`, `heroui-theme.css`, `typography.css`, `spacing.css`, `borders.css`, `shadows.css`, `transitions.css`). Their variables remain available through generated CSS and aliases.

### Deprecated

- All legacy `--color-*`, `--spacing-*`, `--border-*`, `--shadow-*` and `--font-*` aliases. They are supported for 2.x and may be removed in 3.0.

## [1.0.2]

Previous public release.
