# Implementation Plan: Design System Token Audit & Completion

**Branch**: `002-audit-tokens` | **Date**: 2026-04-11 | **Spec**: [spec.md](../spec.md)
**Input**: Feature specification from `/specs/001-audit-tokens/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Extend the Nerux design system token foundation by auditing existing tokens, identifying gaps, and adding missing token categories (spacing, borders, shadows, transitions) to existing or new category-specific CSS files. Technical approach: Add CSS custom properties tokens to src/token/ directory with light/dark theme support, eliminate all hardcoded Tailwind utilities from components, and preserve existing token files unchanged (colors.css, typography.css).

## Technical Context

**Language/Version**: TypeScript ES2022 with React 19 JSX automatic imports  
**Primary Dependencies**: HeroUI v3 React components, Tailwind CSS v4 for utility framework  
**Storage**: CSS custom properties in `src/token/*.css` files with theme overrides  
**Testing**: Storybook stories with Vitest browser testing + Playwright for cross-browser validation  
**Target Platform**: Web browsers (Chrome, Firefox, Safari) with responsive design baseline 1280px+  
**Project Type**: Design system component library (React + TypeScript)  
**Performance Goals**: Storybook load time <3s, zero visual regressions in component rendering  
**Constraints**: No hardcoded color/spacing values in components, maintain pixel-perfect Storybook compatibility, support light/dark theme switching without breaks, preserve existing token files (colors.css, typography.css unchanged)  
**Scale/Scope**: ~10 existing components, ~50-100 new tokens across 4 new files (spacing.css, borders.css, shadows.css, transitions.css), extend existing color and typography categories

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

✅ **Principle III (Design Token System)**: Feature directly implements and enforces CSS custom properties with semantic naming and theme support  
✅ **Principle IV (Storybook-Driven Testing)**: Uses Storybook as source of truth, integrates Vitest for automated testing  
✅ **Principle II (Type Safety)**: Maintains TypeScript strict mode, generates .d.ts declarations  
✅ **Principle VI (Code Quality & Linting)**: Enforces ESLint rules, no hardcoded values allowed  
✅ **Principle VII (Semantic Versioning)**: Token additions are MINOR version bumps, no breaking changes to existing tokens

**No violations detected** - Feature aligns with all constitutional principles.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── token/
│   ├── colors.css          # EXISTING - Color tokens (light/dark themes) - NO CHANGES
│   ├── typography.css      # EXISTING - Typography tokens - NO CHANGES
│   ├── heroui-theme.css    # EXISTING - HeroUI integration tokens
│   ├── spacing.css         # NEW: Spacing tokens (--spacing-xs through --spacing-xl)
│   ├── borders.css         # NEW: Border tokens (--border-width-*, --border-radius-*)
│   ├── shadows.css         # NEW: Shadow tokens (--shadow-sm through --shadow-xl)
│   └── transitions.css     # NEW: Transition tokens (--transition-*)
├── components/
│   └── web/
│       ├── button/
│       │   ├── button.tsx      # UPDATE: Remove hardcoded values
│       │   ├── button.stories.ts # UPDATE: Use token-based classes
│       │   └── button.varaint.ts # Existing variant definitions
│       ├── input/
│       │   ├── input.tsx      # UPDATE: Replace border-[0.2px], rounded-lg with tokens
│       │   └── input.stories.tsx # UPDATE: Token-based styling
│       └── [other components]/ # UPDATE: Audit and refactor hardcoded values
└── index.css               # VERIFY: Check if new token imports already present
```

**Structure Decision**: Single project structure maintained. Existing token files (colors.css, typography.css) remain unchanged. New token category files created only if they don't already exist (spacing.css, borders.css, shadows.css, transitions.css). No tokens-complete.css file. src/index.css modified ONLY if new token file imports are required and not already present. All changes within existing structure.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

_No violations - no complexity tracking required_
