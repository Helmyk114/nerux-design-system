# Rollback

Use this procedure if 2.0 causes a production regression and a forward fix is not immediately available.

## 1. Pin the previous version

```bash
pnpm add nerux-design-system@1.0.2
```

Verify the lockfile and deployed bundle reference `1.0.2`.

## 2. Remove 2.0-only runtime code

If the application added the provider only for 2.0:

```diff
- import { NeruxProvider } from "nerux-design-system";
-
- <NeruxProvider defaultTheme="system">
-   <App />
- </NeruxProvider>
+ <App />
```

Remove `getThemeScript()` from the document head. If the application sets `data-theme` or `data-brand` itself, keep that behavior.

## 3. Restore stylesheet imports

2.0 ships the compiled stylesheet and generated aliases. 1.0.2 ships the older token source files. Restore the imports that existed before the upgrade, and remove imports of files that 1.0.2 does not provide.

## 4. Clear persisted theme state if needed

2.0 may have written `nerux-theme` to `localStorage`. The value is a standard preference (`light`, `dark` or `system`), so it is safe to leave in place. To reset:

```ts
localStorage.removeItem("nerux-theme");
```

## 5. Verify

```bash
pnpm build
pnpm test
```

Check the primary/danger button text, modal and drawer titles, light-theme danger color, and any custom brand assets.

## 6. Follow up

Open an issue with the failing scenario, browser, theme and brand. Once fixed, upgrade again and run the full verification suite before redeploying.
