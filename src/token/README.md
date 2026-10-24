# Nerux tokens

The canonical documentation is in [`docs/tokens.md`](../../docs/tokens.md).

Quick reference:

- Source of truth: `src/token/source/`.
- Generated artifacts: `src/token/generated/` (do not edit).
- Canonical prefix: `--nerux-*`.
- Legacy aliases: `src/token/generated/aliases.css`.
- Rebuild: `pnpm tokens:build`.
- Verify: `pnpm tokens:check`.
- Themes: `:root[data-theme="light"]` and `:root[data-theme="dark"]`.
- Brands: `:root[data-brand="nerux"]` plus runtime `BrandConfig`.
