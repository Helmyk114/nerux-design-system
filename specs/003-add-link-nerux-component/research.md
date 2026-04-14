# Research Findings: Add LinkNerux Component

**Date**: 13 de abril de 2026
**Feature**: specs/003-add-link-nerux-component/spec.md

## Research Tasks Completed

### 1. HeroUI Link Polymorphic Rendering Support

**Task**: Verify if HeroUI Link supports "as" prop for polymorphic rendering

**Findings**:

- HeroUI v3 Link does NOT support "as" prop for polymorphic rendering
- Official migration guide explicitly states: "v3 Link does not support `as` or `asChild`"
- Recommended approach: Use router's Link component with HeroUI CSS classes applied directly

**Decision**: Implement manual polymorphic rendering in LinkNerux using forwardRef and component composition pattern. This provides the desired API while respecting HeroUI's design.

**Rationale**: User requirements specify polymorphic rendering support. Manual implementation allows LinkNerux to provide this feature while maintaining compatibility with HeroUI.

### 2. Best Practices for Polymorphic Rendering in React

**Task**: Find best practices for implementing polymorphic rendering when base component doesn't support it

**Findings**:

- **ForwardRef Pattern**: Use React.forwardRef to create polymorphic components
- **Component Composition**: Accept `as` prop and render different components based on it
- **Prop Forwarding**: Use rest/spread to forward props to the rendered component
- **Type Safety**: Use conditional types to ensure prop compatibility

**Decision**: Implement polymorphic rendering using:

```typescript
const LinkNerux = forwardRef<HTMLElement, LinkNeruxProps>(
  ({ as: Component = Link, ...props }, ref) => {
    return <Component ref={ref} {...props} />;
  }
);
```

**Rationale**: This pattern provides flexibility while maintaining type safety and follows React best practices.

### 3. Icon Positioning with HeroUI Link.Icon

**Task**: Research how to properly use Link.Icon for positioning icons

**Findings**:

- HeroUI Link.Icon is a compound component for icon placement
- It handles sizing and positioning automatically
- Icons should be rendered inside Link.Icon wrapper
- Link.Icon manages alignment and spacing

**Decision**: Use Link.Icon as specified in requirements:

```jsx
<Link.Icon>
  <IconNerux name={startIcon} size="sm" />
</Link.Icon>
```

**Rationale**: Follows HeroUI's intended usage pattern and ensures consistent icon positioning.

### 4. Existing Component Patterns in Codebase

**Task**: Document patterns from existing components (button as reference)

**Findings**:

- Components follow structure: component.tsx, component.types.ts, component.variant.ts, component.stories.ts
- Button component extends HeroUI with custom variants and icons
- IconNerux located in src/components/web/icons/ with TablerIcons integration
- Uses clsx for conditional styling and Tailwind custom properties
- TypeScript strict with explicit interfaces extending HeroUI props

**Decision**: Follow button component pattern exactly for LinkNerux implementation.

**Rationale**: Maintains consistency with existing codebase and constitution requirements.

### 5. Design Token Usage for Links

**Task**: Verify available tokens for link styling

**Findings**:

- Tokens available in src/token/: colors.css, typography.css, etc.
- Custom properties follow pattern: --color-primary-bg-default
- Tailwind v4 syntax: bg-(--color-primary-bg-default)

**Decision**: Use existing color and typography tokens for link variants.

**Rationale**: No hardcoded values, follows token system requirements.

## Key Decisions

1. **Polymorphic Rendering**: Implement manually using forwardRef pattern
2. **Component Structure**: Follow button pattern with .tsx, .types.ts, .variant.ts, .stories.ts files
3. **Icon Integration**: Use Link.Icon wrapper with IconNerux inside
4. **Styling**: Use design tokens exclusively, no hardcoded values
5. **Variants**: Support default and disabled states as specified

## Resolved Clarifications

- Performance Goals: No specific requirements identified - standard React component performance acceptable
- HeroUI "as" prop: Not supported - implement manually
- Component location: src/components/web/link/ following existing pattern
- Icon library: IconNerux with TablerIcons as specified

All NEEDS CLARIFICATION items from Technical Context have been resolved.
