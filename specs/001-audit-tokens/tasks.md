---
description: "Task list template for feature implementation"
---

# Tasks: Design System Token Audit & Completion

**Input**: Design documents from `/specs/001-audit-tokens/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Audit Existing Token System

**Purpose**: Understand current token state in production system

- [x] T001 Audit src/token/ and list all existing token files and defined tokens before making changes

---

## Phase 2: Add Missing Tokens to Existing Files

**Purpose**: Extend existing token files with missing categories (production-safe approach)

**⚠️ IMPORTANT**: Add tokens to category-specific files in src/token/—create new files only if category file doesn't exist

- [x] T002 [P] Add spacing tokens (--spacing-xs through --spacing-xl) to src/token/spacing.css
- [x] T003 [P] Add border tokens (--border-width-thin, --border-radius-sm, etc.) to src/token/borders.css
- [x] T004 [P] Add shadow tokens (--shadow-sm through --shadow-xl) to src/token/shadows.css
- [x] T005 [P] Add transition tokens (--transition-default, etc.) to src/token/transitions.css
- [x] T006 Verify all new tokens have light and dark theme variants in their respective files

**Checkpoint**: All missing token categories added; verify src/index.css imports all token files before proceeding with component refactoring

---

## Phase 3: User Story 1 - Token Inventory & Gap Analysis (Priority: P1) 🎯 MVP

**Goal**: Understand current token state, identify gaps and inconsistencies

**Independent Test**: Can be fully tested by producing comprehensive audit report

### Implementation for User Story 1

- [x] T007 [P] [US1] Audit existing tokens in src/token/colors.css and src/token/typography.css
- [x] T008 [P] [US1] Scan all components in src/components/web/ for hardcoded values
- [x] T009 [P] [US1] Identify nomenclatura inconsistencies (--surface-table-header vs --color-surface-default)
- [x] T010 [US1] Generate gap analysis report comparing current vs required tokens
- [x] T011 [US1] Validate existing token usage in components via grep search

**Checkpoint**: At this point, US1 should provide complete inventory of current state

---

## Phase 4: User Story 2 - Formalize Visual Patterns as Tokens (Priority: P1) 🎯 MVP

**Goal**: Create complete token system and refactor components to use tokens

**Independent Test**: Can be tested by verifying all hardcoded values replaced with token references

### Implementation for User Story 2

- [x] T012 [P] [US2] Update ButtonNerux component to use token references in src/components/web/button/button.tsx
- [x] T013 [P] [US2] Update InputNerux component to replace border-[0.2px], rounded-lg in src/components/web/input/input.tsx
- [x] T014 [P] [US2] Update CardNerux component styling in src/components/web/card/card.tsx
- [x] T015 [P] [US2] Update ModalNerux component in src/components/web/modal/modal.tsx
- [x] T016 [P] [US2] Update DrawerNerux component in src/components/web/drawer/drawer.tsx
- [x] T017 [P] [US2] Update remaining components (Table, Pagination, etc.) in src/components/web/
- [x] T018 [US2] Update all Storybook stories to use token-based CSS classes
- [x] T019 [US2] Verify no hardcoded Tailwind utilities remain in component files

**Checkpoint**: At this point, US2 should have complete token system with all components migrated

---

## Phase 5: User Story 3 - Validate Token Consistency Across Themes (Priority: P2)

**Goal**: Ensure light/dark theme switching works without visual breaks

**Independent Test**: Can be tested by Storybook theme switching validation

### Implementation for User Story 3

- [x] T020 [P] [US3] Verify all tokens defined in both light and dark themes
- [x] T021 [P] [US3] Test theme switching in Storybook across all component stories
- [x] T022 [P] [US3] Validate contrast ratios for text colors in both themes
- [x] T023 [US3] Add automated theme switching tests to Storybook configuration
- [x] T024 [US3] Document theme-specific token adjustments (darker shadows in dark mode)

**Checkpoint**: At this point, US3 should guarantee theme consistency

---

## Phase 6: User Story 4 - Document Token Usage & Deprecations (Priority: P2)

**Goal**: Provide comprehensive documentation and migration guidance

**Independent Test**: Can be tested by new developer successfully using tokens

### Implementation for User Story 4

- [x] T025 [P] [US4] Create token usage documentation in src/token/README.md
- [x] T026 [P] [US4] Add TypeScript type definitions for token values
- [x] T027 [P] [US4] Document component token dependencies in each component file
- [x] T028 [US4] Create migration guide for deprecated token patterns
- [x] T029 [US4] Add token validation ESLint rules to prevent hardcoded values

**Checkpoint**: At this point, US4 should provide complete documentation

---

## Final Phase: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, testing, and quality assurance

- [x] T030 Run full Storybook build and verify no visual regressions
- [x] T031 [P] Execute ESLint across all component files to ensure no hardcoded values
- [x] T032 [P] Test TypeScript compilation with new token types
- [x] T033 [P] Validate build output contains all token definitions
- [x] T034 [P] Update package.json version for MINOR release (new tokens added)
- [x] T035 Create final validation checklist for token system completeness
- [x] T036 Document any remaining edge cases or known limitations
- [x] T037 Prepare release notes for token system completion

**Final Checkpoint**: All success criteria met, token system production-ready
