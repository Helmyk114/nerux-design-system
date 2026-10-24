# Tokens

Nerux tokens have a single source of truth in `src/token/source/`. CSS and TypeScript artifacts are generated from that source; never edit files in `src/token/generated/` directly.

## Source layout

| File | Responsibility |
| --- | --- |
| `source/primitives.ts` | Raw color ramps, spacing, radius, typography, shadows and transitions. |
| `source/semantic.ts` | Theme-aware semantic tokens, HeroUI mappings, legacy aliases and contrast pairs. |
| `source/brands.ts` | Built-in brand definitions and the default brand. |
| `source/color.ts` | Build-time hex parsing, relative luminance, WCAG contrast and foreground selection. |
| `source/types.ts` | Types shared by the source and generator. |
| `scripts/build-tokens.ts` | Deterministic generator, `--check` mode and contrast validation. |

## Generated artifacts

`pnpm tokens:build` writes:

- `generated/primitives.css`
- `generated/semantic.css`
- `generated/brands.css`
- `generated/heroui.css`
- `generated/aliases.css`
- `generated/index.css`
- `generated/types.ts`

`pnpm tokens:check` regenerates in memory and fails when the committed artifacts differ, when an alias points to a missing token, or when a contrast pair drops below its minimum ratio.

## Naming

Canonical tokens use the `--nerux-` prefix:

```css
background: var(--nerux-color-surface-default);
color: var(--nerux-color-text-default);
border-color: var(--nerux-color-border-default);
```

Legacy names remain in `generated/aliases.css`:

```css
--color-surface-default: var(--nerux-color-surface-default);
--spacing-4: var(--nerux-spacing-4);
```

The aliases are deprecated but supported for the 2.x line. New code should use canonical names.

### Text and brand foreground

The legacy `--color-primary-text-default` token historically meant body text, not text on a brand background. Its alias therefore points to `--nerux-color-text-default`. Text placed on a primary/brand background must use:

```css
color: var(--nerux-color-primary-foreground);
```

## Themes

Semantic tokens are emitted for light and dark themes:

```css
:root,
:root[data-theme="light"] { /* light values */ }

:root[data-theme="dark"] { /* dark values */ }
```

`NeruxProvider` and `getThemeScript` set `data-theme` on `<html>` by default. The `targetSelector` option can target another element.

## Brands

The default brand is `nerux`:

```css
:root[data-brand="nerux"] {
  --nerux-brand-base: #7c3aed;
  /* hover, active, disabled, focus ring and foreground are derived */
}
```

Derived brand colors use native CSS `color-mix(in oklch, ...)`. When supported, `contrast-color()` picks the foreground; otherwise the build-time `--nerux-brand-foreground` fallback is used. The build validates every built-in brand base against its chosen foreground at AA (4.5:1).

Custom brands are applied at runtime with `BrandConfig`. See [theming](theming.md).

## Adding or changing a token

1. Edit the relevant file in `src/token/source/`.
2. Run `pnpm tokens:build`.
3. Commit both the source change and the regenerated artifacts.
4. Run `pnpm test` to validate generation, aliases and contrast.
5. Add or update a legacy alias only when a public legacy name must keep working.

## Contrast

`source/semantic.ts` exports `contrastPairs`. Each pair declares a foreground, background, optional minimum ratio (default 4.5) and a label. `validateContrast()` runs during generation and is covered by `src/token/tokens.test.ts`.

When adding a semantic color that can carry text, add the corresponding contrast pair.
