# T001 Audit Report: Existing Token System

**Timestamp**: 2026-04-11  
**Status**: ✅ COMPLETED

## Current Token Files (3 files)

### 1. colors.css (1.0K)

**Status**: EXISTING - Light & Dark themes defined

**Defined Tokens** (2 themes):

#### Light Theme `:root[data-theme="light"]`

- `--color-bg`: #ededed (background)
- Semantic colors: `--color-exito`, `--color-advertencia`, `--color-error`, `--color-informacion`
- Brand colors primary: `--color-primary-bg-default` (#8e05c2)
- Brand colors other: `--color-disabled-bg-default`, `--color-neutral-bg-default`
- Surface colors: `--color-border-default`, `--color-surface-default`, `--surface-table-header`
- Text colors: `--color-primary-text-default` (#121212), `--color-primary-text-disabled`

#### Dark Theme `:root[data-theme="dark"]`

- All same tokens defined with dark-appropriate values
- Text colors inverted (#f2f2f2 for primary text)
- Surfaces darkened (#1e1e1e, #2c2c2c, etc.)

**Total Color Tokens**: 16 tokens × 2 themes = 32 token definitions

**Issues**:

- Inconsistent naming: `--surface-table-header` lacks `--color-` prefix
- Semantic colors use Spanish names (exito, advertencia) vs English elsewhere

### 2. heroui-theme.css (1.6K)

**Status**: EXISTING - HeroUI integration layer

**Defined Tokens** (integrations):

- `--accent`, `--accent-foreground`
- `--success`, `--success-foreground`
- `--warning`, `--warning-foreground`
- `--danger`, `--danger-foreground`
- Field styling: `--field-background`, `--field-foreground`, `--field-placeholder`, `--field-border`
- General: `--border`, background colors

**Purpose**: Maps between Nerux tokens and HeroUI expected tokens
**Status**: ✅ Well-structured, no changes needed

### 3. typography.css (434B)

**Status**: EXISTING - Font definitions

**Defined Tokens**:

- Font family: `--font-family-base`
- Font sizes: `--font-size-title`, `--font-size-subtitle`, `--font-size-body`, `--font-size-caption`
- Font weights: `--font-weight-light`, `--font-weight-regular`, `--font-weight-medium`, `--font-weight-semibold`, `--font-weight-bold`

**Total Typography Tokens**: 10 tokens (1 family + 4 sizes + 5 weights)

---

## Missing Token Files (Need to Create)

### Required: spacing.css

**Status**: ❌ MISSING - Needed for consistent spacing

**Planned tokens**:

- `--spacing-xs` through `--spacing-xl` (9-11 values)
- Used by components with hardcoded `gap-4`, `gap-6`, padding, margin

### Required: borders.css

**Status**: ❌ MISSING - Needed for border standardization

**Planned tokens**:

- Needed: `--border-width-thin: 0.2px` (ref: input border-[0.2px])
- Border radiuses: `--border-radius-sm`, `--border-radius-md`, etc.
- Input uses hardcoded `rounded-lg` - needs tokenization

### Required: shadows.css

**Status**: ❌ MISSING - For elevation system

**Planned tokens**:

- `--shadow-sm` through `--shadow-xl`
- Modal/drawer use `variant="blur"` - needs shadow tokens

### Required: transitions.css

**Status**: ❌ MISSING - For animation consistency

**Planned tokens**:

- `--transition-default`
- `--transition-fast`, `--transition-slow` (variants)

---

## Current Component Usage Audit

### Scanning for Hardcoded Values

**InputNerux** ([src/components/web/input/input.tsx]()):

- ✗ `border-[0.2px]` - hardcoded border width (needs `--border-width-thin`)
- ✗ `rounded-lg` - hardcoded border radius (needs `--border-radius-md`)

**Components using direct Tailwind utilities**:

- `gap-4`, `gap-6` - should use `--spacing-*` tokens
- Various `padding`, `margin` classes - should use `--spacing-*` tokens

---

## Import Chain Verification

**src/index.css**:
Must verify it imports all token files:

```css
@import "token/colors.css";
@import "token/typography.css";
@import "token/heroui-theme.css";
/* Missing: spacing, borders, shadows, transitions */
```

---

## Summary & Next Steps

✅ **3 Token Files Present**:

- colors.css (16 color tokens × 2 themes)
- typography.css (10 typography tokens)
- heroui-theme.css (HeroUI integration)

❌ **4 Token Files Missing**:

- spacing.css (to be created)
- borders.css (to be created)
- shadows.css (to be created)
- transitions.css (to be created)

**Naming Issues Identified**:

- `--surface-table-header` lacks `--color-` prefix convention

**Hardcoded Values to Replace**:

- Input: `border-[0.2px]`, `rounded-lg`
- Components: `gap-4`, `gap-6`, various padding/margin

**Ready for Phase 2**: Adding spacing, borders, shadows, transitions tokens
