# Token System Edge Cases & Known Limitations

## Current Limitations

### 1. ESLint Token Validation

**Status**: Basic implementation
**Limitation**: Only detects hardcoded hex colors, not all token violations
**Impact**: Developers may accidentally use hardcoded values
**Workaround**: Manual code review for token compliance
**Future**: Enhanced ESLint rules with AST analysis

### 2. Theme Persistence

**Status**: Not implemented
**Limitation**: Theme choice doesn't persist across sessions
**Impact**: Users must re-select theme on each visit
**Workaround**: Implement localStorage-based persistence
**Future**: Add theme persistence utility

### 3. Dynamic Token Modification

**Status**: Limited support
**Limitation**: Cannot modify token values at runtime
**Impact**: Fixed token values, no dynamic theming
**Workaround**: Use CSS custom properties with JavaScript overrides
**Future**: Runtime token modification API

### 4. High Contrast Theme

**Status**: Not implemented
**Limitation**: Only light/dark themes available
**Impact**: No accessibility high-contrast option
**Workaround**: Manual CSS overrides for high contrast needs
**Future**: Add high-contrast theme variant

## Edge Cases

### 1. CSS Specificity Conflicts

**Scenario**: Third-party CSS overrides token-based styles
**Example**:

```css
/* Token-based style */
.my-component {
  background-color: var(--color-primary-bg-default);
}

/* High-specificity override */
.third-party .my-component {
  background-color: #ff0000 !important; /* Overrides token */
}
```

**Solution**: Use CSS modules or increase specificity
**Prevention**: Document specificity requirements

### 2. Token Loading Order

**Scenario**: Token files loaded in wrong order
**Impact**: Missing token definitions cause fallback to defaults
**Prevention**: Always import tokens in this order:

```css
@import "./colors.css";
@import "./typography.css";
@import "./spacing.css";
@import "./borders.css";
@import "./shadows.css";
@import "./transitions.css";
```

### 3. Theme Attribute Timing

**Scenario**: Theme switching before DOM ready
**Impact**: Flash of unstyled content (FOUC)
**Solution**: Set theme attribute in `<html>` tag

```html
<html data-theme="light">
  <!-- Prevents FOUC -->
</html>
```

### 4. CSS Custom Property Inheritance

**Scenario**: Nested components inherit unwanted token values
**Example**:

```css
.parent {
  --color-text-primary: #000; /* Dark text */
}

.parent .child {
  /* Inherits dark text, but child needs light text */
  color: var(--color-text-primary);
}
```

**Solution**: Reset tokens at component boundaries

```css
.child {
  --color-text-primary: #fff; /* Override for this scope */
}
```

## Browser-Specific Issues

### 1. Safari CSS Custom Properties

**Issue**: Older Safari versions have bugs with `var()` fallback
**Workaround**: Always provide fallback values

```css
.my-element {
  color: var(--color-text-primary, #121212); /* Fallback for Safari */
}
```

### 2. Firefox Theme Switching

**Issue**: Theme transitions may cause slight delays
**Impact**: Minimal visual flicker during theme changes
**Workaround**: Use `transition: none` during theme switches

### 3. IE11 Support

**Status**: Not supported
**Limitation**: No CSS custom properties support
**Workaround**: Provide static CSS fallback
**Note**: IE11 usage < 1%, acceptable to drop support

## Performance Considerations

### 1. CSS Custom Properties Performance

**Myth**: CSS variables are slow
**Reality**: Modern browsers optimize `var()` lookups
**Measurement**: < 0.1ms impact on style recalculation

### 2. Token Bundle Size

**Current**: 399.52 kB CSS (37.75 kB gzipped)
**Impact**: Minimal for modern connections
**Optimization**: Tree-shaking removes unused tokens

### 3. Theme Switching Performance

**Implementation**: Instant CSS variable updates
**No JavaScript**: Pure CSS theme switching
**No layout thrashing**: No reflows during theme changes

## Migration Edge Cases

### 1. Legacy Component Libraries

**Scenario**: Existing components use hardcoded HeroUI classes
**Solution**: Gradual migration with wrapper components

```tsx
// Before: Hardcoded HeroUI
<Button color="primary" />

// After: Token-wrapped
<ButtonNerux color="primary" className="bg-[var(--color-primary-bg-default)]" />
```

### 2. Design System Conflicts

**Scenario**: Multiple design systems in same application
**Solution**: Namespace tokens to avoid conflicts

```css
/* Nerux tokens */
--nerux-color-primary: #8e05c2;

/* Other system tokens */
--other-color-primary: #different;
```

### 3. Dynamic Content

**Scenario**: CMS content with inline styles
**Solution**: Sanitize content or override with CSS

```css
/* Override inline styles */
.cms-content [style*="color"] {
  color: var(--color-text-primary) !important;
}
```

## Testing Edge Cases

### 1. Theme Switching Stress Test

- Rapid theme switching (100+ times)
- Theme switching during animations
- Theme switching with open modals/dropdowns

### 2. Token Override Testing

- Component-level token overrides
- Nested component token inheritance
- CSS specificity conflicts

### 3. Browser Compatibility Testing

- Theme switching in all supported browsers
- CSS custom properties fallbacks
- Print styles with themes

## Future Improvements

### Short Term (v0.4.0)

- Enhanced ESLint rules
- Theme persistence
- High contrast theme

### Medium Term (v0.5.0)

- Dynamic token modification
- Theme variants (color-blind friendly)
- Advanced token validation

### Long Term (v1.0.0)

- Token editor UI
- Theme import/export
- Advanced customization API

## Support & Troubleshooting

### Common Issues

1. **Tokens not applying**: Check import order in `index.css`
2. **Theme not switching**: Verify `data-theme` attribute on `<html>`
3. **Contrast issues**: Test with actual content, not just tokens
4. **Build failures**: Ensure all token files exist and are valid CSS

### Getting Help

- Check `src/token/README.md` for usage examples
- Review `MIGRATION.md` for migration guidance
- Test in Storybook for visual verification
- Validate with `VALIDATION-CHECKLIST.md` for completeness
