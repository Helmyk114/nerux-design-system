# Theming and brands

## Provider

`NeruxProvider` applies `data-theme` and `data-brand` to `<html>` by default and keeps the resolved theme in sync with `prefers-color-scheme` when the preference is `system`.

```tsx
import { NeruxProvider } from "nerux-design-system";

export function App() {
  return (
    <NeruxProvider defaultTheme="system">
      <Routes />
    </NeruxProvider>
  );
}
```

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `defaultTheme` | `"light" \| "dark" \| "system"` | `"system"` | Initial preference when nothing is stored. |
| `storageKey` | `string` | `"nerux-theme"` | `localStorage` key. |
| `persist` | `boolean` | `true` | Read and write the preference in `localStorage`. |
| `theme` | `"light" \| "dark" \| "system"` | uncontrolled | Controlled preference. |
| `onThemeChange` | `(theme) => void` | — | Called after a preference change. |
| `brand` | `string \| BrandConfig` | `"nerux"` | Built-in brand name or custom brand configuration. |
| `targetSelector` | `string` | `"html"` | Element that receives `data-theme` and `data-brand`. |

## Reading and changing the theme

```tsx
import { useNeruxTheme } from "nerux-design-system";

function ThemeToggle() {
  const { theme, resolvedTheme, setTheme, brand } = useNeruxTheme();
  return (
    <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      {resolvedTheme} · {brand}
    </button>
  );
}
```

`useNeruxTheme` throws if used outside `NeruxProvider`.

## Controlled theme

```tsx
const [theme, setTheme] = useState<ThemePreference>("system");

<NeruxProvider theme={theme} onThemeChange={setTheme}>
  <App />
</NeruxProvider>;
```

In controlled mode the provider does not update its internal store; the parent owns the value. If `persist` is enabled, changes are still written to storage.

## SSR anti-FOUC

Render the theme script in `<head>` before any visible content:

```tsx
import { getThemeScript } from "nerux-design-system";

export function Document({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: getThemeScript({ defaultTheme: "system" }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

The script reads the persisted preference, resolves `system` with `matchMedia`, sets `data-theme` and `data-brand`, applies custom brand variables, and updates or creates `<link rel="icon" data-nerux-favicon>` idempotently. It is safe to run more than once.

Keep the provider options aligned with the script options so hydration does not switch theme or brand.

## Custom brands

```tsx
<NeruxProvider
  brand={{
    name: "ocean",
    primary: "#0369a1",
    foreground: "#ffffff",
    logoLight: "/brand/ocean-light.svg",
    logoDark: "/brand/ocean-dark.svg",
    favicon: "/brand/ocean.ico",
  }}
>
  <App />
</NeruxProvider>
```

`primary` is required. If `foreground` is omitted, the build-time default for the selected theme is used. For custom brand colors, pass a foreground that reaches at least 4.5:1 against `primary`, or verify the computed value before release.

The provider writes:

- `--nerux-brand-base`
- `--nerux-brand-foreground` (when provided)
- `--nerux-brand-logo-light` / `--nerux-brand-logo-dark` (when provided)
- `--nerux-brand-favicon` (when provided)
- `--nerux-brand-name`

Hover, active, disabled and focus colors are derived from `--nerux-brand-base` in CSS.

### Built-in brands

Built-in brands live in `src/token/source/brands.ts`. Unknown string brand names fall back to `nerux` and log a development warning. Custom `BrandConfig` objects are not restricted to the built-in list.

## Persistence

`localStorage` access is guarded against private-mode and restricted contexts. Invalid stored values are ignored and the `defaultTheme` is used. Set `persist={false}` to opt out entirely.

## Logos and favicon

Logo values are exposed as CSS `url(...)` variables. Use them with `background-image` or read them with `getComputedStyle`:

```tsx
<div style={{ backgroundImage: "var(--nerux-brand-logo-light)" }} />
```

The favicon is also applied to `document.head` by the provider and by `getThemeScript`. The link is tagged with `data-nerux-favicon` and restored or removed on unmount.
