# Research Findings: Design System Token Audit & Completion

**Date**: 2026-04-11  
**Phase**: 0 (Research & Clarification)  
**Input**: Clarified specification from spec.md

## Executive Summary

All NEEDS CLARIFICATION items from initial specification have been resolved through targeted clarification questions. No additional research required - specification is complete and actionable.

## Clarification Decisions

### 1. Hardcoded Values Inventory

**Question**: What are the specific hardcoded values detected in components?
**Decision**: Confirmed hardcoded values include `border-[0.2px]`, `rounded-lg`, `gap-4`, `gap-6` in Tailwind utilities
**Rationale**: Direct component audit revealed these patterns. No additional research needed - values are concrete and actionable.
**Impact**: Defines exact scope for FR-003 (hardcoded value elimination)

### 2. Nomenclatura Inconsistencies

**Question**: What inconsistencies exist in token naming conventions?
**Decision**: Identified `--surface-table-header` lacking 'color-' prefix vs `--color-surface-default` with prefix
**Rationale**: CSS audit showed inconsistent prefix usage. Standardizing to `--color-[category]-[element]-[state]` pattern.
**Impact**: Ensures FR-011 (consistent nomenclatura) and maintainability

### 3. Missing Token Categories

**Question**: What tokens are missing for complete system coverage?
**Decision**: Missing spacing (--spacing-xs: 0.5rem, etc.), borders (--border-width-thin: 0.2px, --radius-sm: 0.25rem), shadows (--shadow-sm: 0 1px 2px rgba(0,0,0,0.05)), transitions (--transition-default: 200ms ease)
**Rationale**: Component pattern analysis revealed these gaps. Values derived from existing Tailwind scales and component usage.
**Impact**: Completes FR-001 (token completeness) across all visual dimensions

### 4. Theme Consistency Criteria

**Question**: How to ensure light/dark theme consistency?
**Decision**: Define all new tokens in both themes with appropriate values (darker shadows in dark mode, better text contrast). Verify in Storybook no visual breaks.
**Rationale**: Theme switching requirements demand complete coverage. Contrast adjustments prevent accessibility issues.
**Impact**: Guarantees FR-004 (theme switching) and Success Criteria #3

### 5. Token Usage Criteria

**Question**: How to determine if existing tokens are "in use"?
**Decision**: Token is in use if referenced in at least one component or story (grep search in src/components/ and .stories files). Do not modify existing token values, only add new ones.
**Rationale**: Prevents breaking changes while allowing expansion. Grep-based verification ensures accuracy.
**Impact**: Defines constraints for safe token evolution

## Research Conclusions

### No Additional Research Required

- All technical unknowns resolved through specification clarification
- Component codebase fully audited for patterns and inconsistencies
- Token system requirements clearly defined with concrete values
- Implementation approach validated against constitutional principles

### Key Technical Findings

- **Token Categories**: 6 complete categories (colors, typography, spacing, borders, shadows, transitions)
- **Theme Strategy**: Complete light/dark overrides, no inheritance from light mode
- **Component Impact**: ~10 components require refactoring of hardcoded utilities
- **Build Integration**: Vite + Tailwind CSS v4 supports CSS custom properties seamlessly

### Risk Assessment

- **Low Risk**: No breaking changes to existing tokens or components
- **Low Risk**: Storybook-driven approach ensures visual regression detection
- **Low Risk**: TypeScript strict mode prevents runtime token errors

## Next Phase Readiness

Specification is fully clarified and ready for Phase 1 design artifacts:

- ✅ Data model entities defined
- ✅ Interface contracts identified (minimal for design system)
- ✅ Quickstart guide scope clear
- ✅ Agent context update requirements understood

**Status**: Research Complete - Proceed to Phase 1 Design
