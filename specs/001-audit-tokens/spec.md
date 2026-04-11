# Feature Specification: Design System Token Audit & Completion

**Feature Branch**: `001-audit-tokens`  
**Created**: 2026-04-11  
**Status**: Draft  
**Input**: Audit existing tokens and component patterns, complete missing tokens for consistency

## User Scenarios & Testing

### User Story 1 - Token Inventory & Gap Analysis (Priority: P1)

As a design system maintainer, I need to understand which design tokens currently exist, which are actually used in components, and which are missing so that I can establish a complete token system.

**Why this priority**: P1 - This is foundational. Without understanding the current state, we cannot safely add new tokens or refactor existing patterns.

**Independent Test**: Can be fully tested by auditing existing component implementations and the token files, producing a comprehensive inventory report.

**Acceptance Scenarios**:

1. **Given** the current `src/token/` directory, **When** auditing all CSS files, **Then** generate a complete list of defined tokens (colors, typography, spacing, borders, shadows)
2. **Given** all component implementations in `src/components/`, **When** scanning for CSS class usage, **Then** identify hardcoded values like `border-[0.2px]`, `rounded-lg`, `gap-4` that should be tokens
3. **Given** the existing tokens, **When** comparing with component usage, **Then** identify semantic gaps (e.g., "color tokens exist but spacing tokens don't exist")
4. **Given** multiple components using similar values, **When** cross-referencing, **Then** detect inconsistencies (e.g., borders applied as `border-[0.2px]` in Input, `border-1px` in Select)

---

### User Story 2 - Formalize Visual Patterns as Tokens (Priority: P1)

As a developer, I need clearly defined tokens for all visual dimensions (spacing, borders, radii, shadows) so that I can apply consistent styling without hardcoding values.

**Why this priority**: P1 - Directly enables the success criteria: all hardcoded values must have token equivalents.

**Independent Test**: Can be fully tested by verifying that a complete token file (`tokens-complete.css`) defines every visual attribute used by at least one component.

**Acceptance Scenarios**:

1. **Given** the Input component uses `border-[0.2px] rounded-lg`, **When** checking tokens, **Then** verify `--border-width-thin: 0.2px` and `--radius-md: 0.5rem` are defined
2. **Given** components use gap values like `gap-4` or `gap-6`, **When** scanning spacing patterns, **Then** formalize as `--spacing-4: 1rem`, `--spacing-6: 1.5rem`, etc.
3. **Given** modal and drawer use `variant="blur"`, **When** checking token coverage, **Then** ensure backdrop blur, shadow depth are tokenized
4. **Given** Storybook stories demonstrate component states (default, hover, disabled, error), **When** verifying token coverage, **Then** ensure all state colors are tokenized

---

### User Story 3 - Validate Token Consistency Across Themes (Priority: P2)

As a consumer of the design system, I need to verify that light/dark mode tokens are consistent and complete so that switching themes doesn't break the visual experience.

**Why this priority**: P2 - Important for production quality, but dependent on P1 completing the token set.

**Independent Test**: Can be tested by comparing theme implementations side-by-side in Storybook under light and dark modes.

**Acceptance Scenarios**:

1. **Given** light and dark theme definitions, **When** comparing token values, **Then** identify any missing tokens in either theme
2. **Given** a component using `--color-primary-bg-default`, **When** toggling theme, **Then** verify the color adjusts appropriately
3. **Given** components with error, success, warning states, **When** viewing in both themes, **Then** ensure readability (sufficient contrast) maintained

---

### User Story 4 - Document Token Usage & Deprecations (Priority: P2)

As a team member onboarding to the design system, I need clear documentation showing which tokens are safe to use, which are deprecated, and how to apply them so that I don't reintroduce inconsistencies.

**Why this priority**: P2 - Ensures long-term maintainability and prevents regression during future development.

**Independent Test**: Can be tested by new developer following token documentation to style a new component without introducing hardcoded values.

**Acceptance Scenarios**:

1. **Given** the token system documentation, **When** a developer needs to style spacing, **Then** they can find the correct spacing token (e.g., `--spacing-4`) and usage example
2. **Given** a token marked as deprecated, **When** checking documentation, **Then** see migration guidance (e.g., "Use `--color-error-light` instead of `--color-warning`")
3. **Given** component styles documented, **When** reviewing, **Then** see which tokens each component uses (e.g., "Button uses: `--color-primary-bg-default`, `--radius-md`, `--spacing-2`")

---

### Edge Cases

- What happens when a component uses both HeroUI default colors AND Nerux custom tokens? (e.g., Button from HeroUI vs ButtonNerux wrapper)
- How do we handle transitional values during migration (e.g., when refactoring Input to use new tokens)?
- Should tokens include responsive values (e.g., `--spacing-mobile-4: 0.75rem`, `--spacing-desktop-4: 1rem`)?
- Dark mode: do we need separate token definitions for all properties, or can some inherit from light mode?

---

## Requirements

### Functional Requirements

- **FR-001**: System MUST maintain a complete CSS token file (`src/token/tokens-complete.css`) that defines every visual dimension used across components
- **FR-002**: System MUST define token categories: Colors (semantic + brand), Typography (sizes, weights, families), Spacing (padding, margin, gap), Borders (widths, radii, styles), Shadows (depths, colors)
- **FR-003**: All component implementations MUST use only CSS custom properties for visual attributes—no hardcoded Tailwind utilities like `border-[0.2px]`, `rounded-lg`, `gap-4`
- **FR-004**: System MUST support light/dark theme switching via `[data-theme="light|dark"]` with complete token overrides for both themes
- **FR-005**: System MUST document token usage patterns with examples for each category
- **FR-006**: Typography tokens MUST include: font-family, font-size (title, subtitle, body, caption), font-weight (light, regular, medium, semibold, bold), line-height
- **FR-007**: Color tokens MUST include: primary/neutral/error semantic backgrounds, corresponding text colors, border colors, surface colors, and state variants (hover, disabled, focus)
- **FR-008**: Spacing tokens MUST define consistent increments (e.g., 4px, 8px, 12px, 16px, 24px, 32px) with semantic names (xs, sm, md, lg, xl)
- **FR-009**: Border tokens MUST define radius variants (none, sm, md, lg, full) and width variants (thin, regular, thick)
- **FR-010**: Shadow tokens MUST define visual hierarchy depths (sm, md, lg, xl) with consistent color + blur + offset values
- **FR-011**: Stories in Storybook MUST update to reference token-based CSS classes instead of hardcoded Tailwind utilities
- **FR-012**: Build output MUST enforce that no inline hardcoded colors/spacing values remain in compiled CSS (validation step)

### Key Entities

- **Token**: A CSS custom property (e.g., `--color-primary-bg-default`, `--spacing-4`) with a concrete value
- **Token Category**: Logical grouping (Colors, Typography, Spacing, Borders, Shadows, Transitions)
- **Theme**: A complete set of token values (light mode, dark mode)
- **Component**: React wrapper (e.g., ButtonNerux) using HeroUI primitive + Nerux tokens for styling
- **Story**: Storybook documentation demonstrating component variants
- **Design Asset**: Visual design reference (Figma, tools) matching the token system

---

## Success Criteria

1. **Token Completeness**: 100% of visual attributes used by components have corresponding tokens defined (colors, spacing, borders, radii, shadows, typography)

2. **Hardcoded Value Elimination**: Zero hardcoded Tailwind utilities in component implementations; all styling references tokens via CSS variables

3. **Theme Consistency**: Light and dark themes define all tokens; no missing theme variants; Storybook demonstrates themes switching without visual breaks

4. **Component Story Updates**: All Storybook stories render correctly after token system is implemented with no visual regressions

5. **Documentation Coverage**: Token documentation includes category descriptions, usage examples, and clear guidance on deprecations/migrations

6. **Maintainability**: New components can be styled using only existing tokens (no prototype phase or special cases)

7. **Type Safety**: TypeScript types reflect available tokens (e.g., type `TokenSpacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl'`) for developer safety

---

## Assumptions

- Light mode is the primary/default theme; dark mode is a complete override (not derived)
- Tailwind CSS v4 is the base utility framework; tokens augment, not replace, Tailwind
- HeroUI v3 components are the underlying primitives; Nerux tokens customize appearance only
- Component stories in Storybook are the source of truth for visual behavior; design documents are supplementary
- Responsive design is out of scope for initial token definition (assumed 1280px+ desktop baseline)
- Animation timing and transitions are low priority; initial focus on static visual attributes (colors, spacing, borders)

---

## Out of Scope

- Generating new components (only auditing + defining tokens for existing components)
- Redesigning component visuals (maintaining pixel-perfect match with current Storybook rendering)
- Responsive token variants (e.g., mobile-specific spacing token values)
- Theming beyond light/dark modes (tri-state, contrast-preferred, etc.)
- Build pipeline optimization (only validating that no hardcoded values leak into dist/)
