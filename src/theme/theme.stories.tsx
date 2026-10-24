import type { Meta, StoryObj } from "@storybook/react-vite";
import { NeruxProvider, useNeruxTheme } from "./index";
import type { ThemePreference } from "./types";

const options: ThemePreference[] = ["light", "dark", "system"];

const oceanLogo = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 32"><rect width="120" height="32" rx="6" fill="#0369a1"/><text x="12" y="22" fill="#ffffff" font-family="sans-serif" font-size="16">Ocean</text></svg>',
)}`;

const oceanFavicon = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#0369a1"/><circle cx="16" cy="16" r="7" fill="#ffffff"/></svg>',
)}`;

const swatches = [
  { label: "Base", value: "var(--nerux-brand-base)" },
  { label: "Hover", value: "var(--nerux-brand-hover)" },
  { label: "Active", value: "var(--nerux-brand-active)" },
  { label: "Disabled", value: "var(--nerux-brand-disabled)" },
  { label: "Focus", value: "var(--nerux-brand-focus-ring)" },
  { label: "Foreground", value: "var(--nerux-brand-foreground)" },
];

function ThemePanel() {
  const { theme, resolvedTheme, setTheme, brand } = useNeruxTheme();

  return (
    <div className="flex w-80 flex-col gap-4 rounded-xl border border-(--nerux-color-border-default) bg-(--nerux-color-surface-default) p-5 text-(--nerux-color-text-default)">
      <div>
        <p className="text-xs uppercase tracking-wide text-(--nerux-color-text-secondary)">
          Nerux theme runtime
        </p>
        <p className="text-lg font-semibold">
          {resolvedTheme} · {brand}
        </p>
        <p className="text-sm text-(--nerux-color-text-secondary)">
          Preference: {theme}
        </p>
      </div>

      <div className="flex gap-2">
        {options.map((option) => {
          const active = theme === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setTheme(option)}
              className={
                active
                  ? "rounded-md border border-transparent bg-(--nerux-color-primary-bg-default) px-3 py-1.5 text-sm text-(--nerux-color-primary-foreground)"
                  : "rounded-md border border-(--nerux-color-border-default) bg-(--nerux-color-surface-secondary) px-3 py-1.5 text-sm text-(--nerux-color-text-default)"
              }
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {swatches.map((swatch) => (
          <div
            key={swatch.label}
            className="flex items-center gap-2 text-xs text-(--nerux-color-text-secondary)"
          >
            <span
              className="h-6 w-6 rounded-full border border-(--nerux-color-border-default)"
              style={{ background: swatch.value }}
            />
            {swatch.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandAssets() {
  return (
    <div className="flex items-center gap-4">
      <div
        role="img"
        aria-label="Ocean logo"
        className="h-10 w-32 rounded-md border border-(--nerux-color-border-default) bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: "var(--nerux-brand-logo-light)" }}
      />
      <div
        role="img"
        aria-label="Ocean favicon"
        className="h-10 w-10 rounded-md border border-(--nerux-color-border-default) bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: "var(--nerux-brand-favicon)" }}
      />
    </div>
  );
}

const meta: Meta = {
  title: "Foundation/Theme",
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const System: Story = {
  render: () => (
    <NeruxProvider defaultTheme="system">
      <ThemePanel />
    </NeruxProvider>
  ),
};

export const Dark: Story = {
  render: () => (
    <NeruxProvider defaultTheme="dark">
      <ThemePanel />
    </NeruxProvider>
  ),
};

export const CustomBrand: Story = {
  render: () => (
    <NeruxProvider
      defaultTheme="light"
      brand={{
        name: "ocean",
        primary: "#0369a1",
        foreground: "#ffffff",
        logoLight: oceanLogo,
        logoDark: oceanLogo,
        favicon: oceanFavicon,
      }}
    >
      <div className="flex flex-col items-center gap-6">
        <ThemePanel />
        <BrandAssets />
      </div>
    </NeruxProvider>
  ),
};
