# Implementation Plan: Add LinkNerux Component

**Branch**: `003-add-link-nerux-component` | **Date**: 13 de abril de 2026 | **Spec**: specs/003-add-link-nerux-component/spec.md
**Input**: Feature specification from `/specs/003-add-link-nerux-component/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Create LinkNerux component as a wrapper over HeroUI v3 Link with icon support using IconNerux, polymorphic rendering, and design token styling. Follow existing component patterns in src/components/web/ and ensure no hardcoded values.

## Technical Context

**Language/Version**: TypeScript ES2022 with React 19 JSX automatic imports  
**Primary Dependencies**: HeroUI v3 React components, Tailwind CSS v4 for utility framework  
**Storage**: N/A (UI component library)  
**Testing**: Vitest via Storybook addon for cross-browser testing  
**Target Platform**: Web browsers (React applications)  
**Project Type**: Design system component library  
**Performance Goals**: NEEDS CLARIFICATION (no specific performance requirements identified)  
**Constraints**: Must follow existing component structure, use tokens from src/token/, no hardcoded values, no react-router-dom dependency  
**Scale/Scope**: Single LinkNerux component with variants and icon support

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### Component-Based Architecture: PASS

- Component will wrap HeroUI Link primitive with Nerux-specific styling and behavior
- Will be organized in src/components/web/link/
- Will extend HeroUI props and provide forward-compatible interface

### Type Safety: PASS

- Will use TypeScript strict mode with explicit prop interfaces
- Will generate .d.ts declarations
- No any types allowed

### Design Token System: PASS

- Will use CSS custom properties from src/token/ for all styling
- Will apply via Tailwind CSS v4 dynamic syntax
- No hardcoded color or spacing values

### Storybook-Driven Testing & Documentation: PASS

- Will include comprehensive Storybook stories for all variants
- Stories will demonstrate all use cases and props
- Will integrate with Vitest for automated testing

### Dual Format Distribution: PASS

- Component will be included in library build output (ES modules + CommonJS)
- Will externalize peer dependencies

### Code Quality & Linting: PASS

- Will follow ESLint rules and pass lint checks
- Will use proper React patterns

### Semantic Versioning: PASS

- New component addition (MINOR version bump)

**GATE STATUS**: PASS - No violations detected. Feature aligns with all constitutional principles.

## Project Structure

### Documentation (this feature)

```text
specs/003-add-link-nerux-component/
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
├── components/
│   └── web/
│       └── link/                    # NEW: LinkNerux component directory
│           ├── link.tsx             # Main component implementation
│           ├── link.variant.ts      # Variant definitions
│           ├── link.stories.ts      # Storybook stories
│           └── link.types.ts        # TypeScript interfaces
├── token/                           # Existing design tokens
│   ├── colors.css
│   ├── typography.css
│   └── ...
└── index.ts                         # Barrel exports (will add LinkNerux)
```

**Structure Decision**: Following existing component pattern from src/components/web/button/. New link/ directory under web/ with standard files: component, variant, stories, types.

## Phase 0: Research & Analysis ✅ COMPLETED

**Status**: Complete
**Output**: research.md

### Research Tasks Completed
1. ✅ HeroUI Link polymorphic rendering support - Found: NO native support, implement manually
2. ✅ Best practices for polymorphic rendering - Decision: forwardRef pattern
3. ✅ Icon positioning with Link.Icon - Decision: Use as wrapper for IconNerux
4. ✅ Existing component patterns - Decision: Follow button component structure
5. ✅ Design token usage - Decision: Use existing tokens, no hardcoded values

### Key Findings
- HeroUI v3 Link does not support "as" prop - manual implementation required
- Polymorphic rendering via forwardRef + component composition
- Link.Icon handles positioning, IconNerux provides visual icons
- Follow button pattern: .tsx, .types.ts, .variant.ts, .stories.ts files

## Phase 1: Design & Contracts ✅ COMPLETED

**Status**: Complete
**Outputs**: data-model.md, contracts/, quickstart.md, agent context updated

### Data Model
- ✅ LinkNerux Component entity defined with all props and relationships
- ✅ IconNerux integration specified
- ✅ HeroUI Link base component documented
- ✅ Validation rules and state transitions defined

### Contracts
- ✅ Public API contract: LinkNeruxProps interface
- ✅ Rendering contract: DOM output specification
- ✅ Styling contract: CSS classes and design tokens

### Quickstart Guide
- ✅ Basic usage examples
- ✅ Advanced polymorphic rendering
- ✅ Context-specific usage (inline, menus, tables, cards)
- ✅ Props reference and TypeScript support

### Agent Context
- ✅ Copilot context updated with new technology
- ✅ Added TypeScript ES2022, HeroUI v3, Tailwind v4 knowledge

## Constitution Check (Post-Design) ✅ PASS

*GATE: Re-evaluated after Phase 1 design completion*

### Component-Based Architecture: PASS
- Design follows HeroUI wrapping pattern
- Maintains component composition principles
- Forward-compatible props via Omit pattern

### Type Safety: PASS
- Explicit TypeScript interfaces extending HeroUI
- Strict mode compliance
- Proper generic types for polymorphic rendering

### Design Token System: PASS
- All styling via CSS custom properties
- No hardcoded values in contracts
- Tailwind v4 dynamic syntax specified

### Storybook-Driven Testing: PASS
- Comprehensive stories planned for all variants
- Integration with Vitest maintained
- Developer experience prioritized

### All Other Principles: PASS
- No violations introduced in design phase
- Semantic versioning compatible (new component)
- Build and distribution patterns maintained

**GATE STATUS**: PASS - Ready for implementation

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |
