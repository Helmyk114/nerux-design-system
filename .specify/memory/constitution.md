# Nerux Design System Constitution

## Core Principles

### I. Component-Based Architecture

All UI elements MUST be encapsulated as React components wrapping HeroUI v3 primitives with Nerux-specific styling and behavior. Components organize by platform (web, mobile) in `src/components/{platform}/{component-name}/`. Each component MUST:

- Extend HeroUI primitives with custom Tailwind CSS styling via design tokens
- Export types alongside implementation in dedicated `.types.ts` files
- Provide multiple visual variants via explicit variant files (e.g., `button.varaint.ts`)
- Include forward-compatible props by extending HeroUI props and explicitly omitting conflicting props

### II. Type Safety (MANDATORY)

TypeScript strict mode MUST be enforced without exceptions. All codebases MUST:

- Target ES2022 with React JSX automatic imports
- Enable `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`, `noFallthroughCasesInSwitch: true`
- Declare types explicitly for all component props using TypeScript interfaces
- Generate type declarations in build output (`.d.ts` files via `vite-plugin-dts`)
- Use `verbatimModuleSyntax` to ensure correct module interop

### III. Design Token System

Visual identity MUST be maintained through CSS custom properties (design tokens) with platform-specific theme support. Token system MUST:

- Define color tokens, typography, spacing, borders, and shadows in CSS files (`src/token/*.css`)
- Support light/dark modes via `[data-theme="light|dark"]` selector switching
- Use semantic color names (`.--color-primary-bg-default`, `.--color-error`, etc.)
- Be applied via Tailwind CSS v4 dynamic value syntax: `bg-(--color-token-name)`
- Never hardcode color values in component files

### IV. Storybook-Driven Testing & Documentation

Component behavior and documentation MUST be defined through Storybook stories as the single source of truth. Stories MUST:

- Colocate with component implementation in `{component}.stories.ts[x]`
- Use Storybook's Meta/Story pattern with TypeScript type inference
- Demonstrate all meaningful component variants and use cases
- Integrate with Vitest via `@storybook/addon-vitest` for automated cross-browser testing
- Be discoverable at `http://localhost:6006` during development

### V. Dual Format Distribution

The built design system library MUST be distributed in both ES modules and CommonJS formats for maximum compatibility. Build output MUST:

- Generate `dist/nerux-ds.es.js` (ES modules) and `dist/nerux-ds.cjs.js` (CommonJS)
- Externalize peer dependencies (React, ReactDOM, HeroUI, Tailwind CSS) to avoid duplication
- Include generated TypeScript type definitions (`dist/index.d.ts`)
- Exclude stories, test files, and Storybook config from distribution
- Use Vite's library mode with Rollup for consistent bundling

### VI. Code Quality & Linting Standards

Source code quality MUST be enforced through ESLint with consistent rules. Linting MUST:

- Apply JavaScript recommended rules via `@eslint/js`
- Enforce React hooks best practices via `eslint-plugin-react-hooks`
- Enforce React Refresh compatibility via `eslint-plugin-react-refresh`
- Apply TypeScript recommended rules via `typescript-eslint`
- Use flat config format (ES modules) in `eslint.config.js`
- Run pre-commit via `pnpm lint` as a quality gate

### VII. Semantic Versioning & Breaking Changes

Component library changes MUST follow semantic versioning (MAJOR.MINOR.PATCH). Version bumps MUST:

- Increment MAJOR for breaking changes (removed components, props, or API alterations)
- Increment MINOR for new non-breaking features (new components or props with defaults)
- Increment PATCH for bug fixes and backward-compatible improvements
- Document all changes in release notes before publishing

## Development Workflow

### Component Development Lifecycle

1. **Design**: Create Storybook story with all use case variants BEFORE implementation
2. **Implement**: Build React component wrapping HeroUI primitives with Nerux styling
3. **Type**: Declare component props interface extending HeroUI props
4. **Test**: Verify all story variants render correctly in browser via Vitest+Playwright
5. **Document**: Ensure story demonstrates purpose, variants, and props clearly
6. **Export**: Add to appropriate `index.ts` for barrel exports

### Build & Deploy Process

- `pnpm dev`: Run Storybook locally at `http://localhost:6006`
- `pnpm build`: Generate typed ES/CJS bundles in `dist/` directory
- `pnpm build-storybook`: Generate static Storybook for CI/web deployment
- `pnpm deploy-storybook`: Deploy built Storybook to GitHub Pages (requires `gh-pages` auth)

## Quality Gates

### Pre-Commit Requirements

1. `pnpm lint` MUST pass without errors
2. All stories MUST render without console errors in browser
3. New components MUST include comprehensive stories covering all variants
4. All TypeScript files MUST compile without errors
5. No `any` types allowed except in well-documented edge cases

### Review Checklist for Component PRs

- [ ] Component wraps HeroUI primitive (not custom React.div implementation)
- [ ] Props interface explicitly extends from HeroUI and documents requirements
- [ ] Design tokens applied via `clsx()` and CSS variable syntax
- [ ] Storybook stories demonstrate all variants (disabled, loading, error, success)
- [ ] TypeScript strict mode compliance verified
- [ ] No hardcoded colors/spacing—all tokens used
- [ ] Story variants match component size/color enums exactly

## Governance

### Constitutional Authority & Amendment Process

This constitution supersedes all prior practices and codebases conventions. All violations MUST be corrected during the next development cycle. Amendments MUST:

1. Preserve existing core principles in spirit (breaking changes require major version bump and deprecation cycle)
2. Be documented in a CHANGELOG entry describing rationale and migration steps
3. Include updated templates in `.specify/templates/` with new rules embedded
4. Be applied to existing codebase retroactively via cleanup task(s)
5. Be validated against all dependent artifacts before acceptance

### Compliance & Enforcement

- **Code Review**: Every PR MUST verify constitution compliance before merge
- **Build CI**: ESLint, TypeScript, and Storybook build MUST pass
- **Version Releases**: Constitution version MUST match library version for traceability
- **Guidance**: `.github/DEVELOPMENT.md` provides runtime procedures for developers

### Design Token Governance

Design tokens MUST be reviewed and approved before deployment. Token changes MUST:

- Be versioned alongside component changes in releases
- Document breaking vs. non-breaking color/spacing modifications
- Include migration guidance for consumers (e.g., "Update `--color-primary-bg-default` to new hex value in `src/token/colors.css`")

**Version**: 1.0.0 | **Ratified**: 2026-04-11 | **Last Amended**: 2026-04-11
