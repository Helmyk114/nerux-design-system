# Component Token Dependencies

This document outlines which CSS custom property tokens each Nerux component depends on. This information is crucial for:

- Understanding component theming requirements
- Identifying which tokens need to be defined for component functionality
- Planning token system changes and their impact on components
- Ensuring proper token loading order

## ButtonNerux (`src/components/web/button/`)

**Required Tokens:**

- `--color-primary-bg-default`: Primary button background
- `--color-primary-text-default`: Primary button text color
- `--color-neutral-bg-default`: Neutral button background
- `--color-disabled-bg-default`: Disabled button background
- `--color-primary-text-disabled`: Disabled button text color
- `--color-error`: Danger button background

**Optional Tokens:**

- `--border-radius-md`: Button border radius (inherited from HeroUI)
- `--shadow-sm`: Button shadow on hover (inherited from HeroUI)

**Files:**

- `button.varaint.ts`: Defines color mappings
- `button.tsx`: Applies variant classes

---

## InputNerux (`src/components/web/input/`)

**Required Tokens:**

- `--border-width-thin`: Input border width
- `--border-radius-lg`: Input border radius
- `--color-border-default`: Default border color
- `--color-primary-bg-default`: Focus/hover border color
- `--color-error`: Error state border color

**Optional Tokens:**

- `--spacing-1`: Icon spacing (if icons present)
- `--color-text-secondary`: Placeholder text color (inherited from HeroUI)

**Files:**

- `input.tsx`: Main component with token usage
- `input.stories.tsx`: Storybook examples

---

## CardNerux (`src/components/web/card/`)

**Required Tokens:**

- `--color-surface-default`: Card background color
- `--color-border-default`: Card border color
- `--border-radius-lg`: Card border radius
- `--shadow-md`: Card shadow elevation

**Optional Tokens:**

- `--spacing-4`: Card padding
- `--spacing-6`: Card content spacing

**Files:**

- `card.tsx`: Main card component
- `cardContent.tsx`: Content wrapper
- `cardHeader.tsx`: Header section
- `cardFooter.tsx`: Footer section

---

## ModalNerux (`src/components/web/modal/`)

**Required Tokens:**

- `--color-surface-default`: Modal background
- `--color-bg`: Modal overlay background
- `--shadow-2xl`: Modal shadow elevation
- `--border-radius-xl`: Modal border radius

**Optional Tokens:**

- `--spacing-6`: Modal padding
- `--spacing-4`: Modal content spacing
- `--color-border-default`: Modal border (if styled)

**Files:**

- `modal.tsx`: Main modal component
- `modalBody.tsx`: Body content wrapper
- `modalHeader.tsx`: Header section
- `modalFooter.tsx`: Footer section

---

## DrawerNerux (`src/components/web/drawer/`)

**Required Tokens:**

- `--color-surface-default`: Drawer background
- `--color-bg`: Page overlay background
- `--shadow-xl`: Drawer shadow elevation
- `--border-radius-lg`: Drawer border radius

**Optional Tokens:**

- `--spacing-6`: Drawer padding
- `--spacing-4`: Drawer content spacing

**Files:**

- `drawer.tsx`: Main drawer component
- `drawerBody.tsx`: Body content wrapper
- `drawerHeader.tsx`: Header section
- `drawerFooter.tsx`: Footer section

---

## TableNerux (`src/components/web/table/`)

**Required Tokens:**

- `--color-surface-default`: Table background
- `--color-surface-secondary`: Alternating row background
- `--color-border-default`: Table borders
- `--border-width-thin`: Border width
- `--color-text-primary`: Header text color
- `--color-text-secondary`: Body text color

**Optional Tokens:**

- `--spacing-4`: Cell padding
- `--spacing-2`: Compact row spacing

**Files:**

- `table.tsx`: Main table component

---

## PaginationNerux (`src/components/web/Pagination/`)

**Required Tokens:**

- `--color-primary-bg-default`: Active page background
- `--color-primary-text-default`: Active page text
- `--color-surface-hover`: Hover state background
- `--color-border-default`: Border colors
- `--border-radius-md`: Button border radius

**Optional Tokens:**

- `--spacing-2`: Button padding
- `--spacing-1`: Element spacing

**Files:**

- `pagination.tsx`: Main pagination component

---

## SelectNerux (`src/components/web/select/`)

**Required Tokens:**

- `--border-width-thin`: Border width
- `--border-radius-lg`: Border radius
- `--color-border-default`: Default border color
- `--color-primary-bg-default`: Focus border color
- `--color-surface-default`: Dropdown background
- `--color-surface-hover`: Option hover background

**Optional Tokens:**

- `--shadow-md`: Dropdown shadow
- `--spacing-1`: Option padding

**Files:**

- `select.tsx`: Main select component

---

## Token Loading Order

Components depend on tokens being loaded in this order:

1. **Base Infrastructure** (`src/index.css` imports):
   - `colors.css` - All color tokens (required first)
   - `typography.css` - Font tokens
   - `spacing.css` - Spacing scale
   - `borders.css` - Border definitions
   - `shadows.css` - Shadow definitions
   - `transitions.css` - Animation tokens

2. **Theme Application**:
   - `:root[data-theme="light"]` - Light theme overrides
   - `:root[data-theme="dark"]` - Dark theme overrides

## Impact Analysis

### Adding New Tokens

- Check which components use similar token patterns
- Update component documentation
- Test theme switching for new color tokens

### Modifying Existing Tokens

- Identify all components using the token
- Test visual impact across all themes
- Update contrast ratios if color tokens change

### Removing Tokens

- Search codebase for token usage
- Provide migration path to replacement tokens
- Update component dependencies documentation

## Development Guidelines

### For Component Authors

1. **Document Token Dependencies**: Add token usage comments in component files
2. **Use Semantic Tokens**: Prefer `--color-primary-*` over generic color names
3. **Test Theme Switching**: Verify component works in both light and dark themes
4. **Handle Missing Tokens**: Provide fallbacks for critical tokens

### For Token System Changes

1. **Update Dependencies**: Modify this document when tokens are added/removed
2. **Version Impact**: Consider semantic versioning for breaking token changes
3. **Migration Guide**: Provide clear migration paths for deprecated tokens

## Validation Checklist

- [ ] All required tokens documented for each component
- [ ] Token loading order verified
- [ ] Theme switching tested for all components
- [ ] Contrast ratios validated for color tokens
- [ ] Fallback values provided for critical tokens
