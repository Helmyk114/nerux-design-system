import type { ContrastPair, SemanticSource, TokenMap } from "./types";

const shared: TokenMap = {
  "color-primary-bg-default": "var(--nerux-brand-base)",
  "color-primary-bg-hover": "var(--nerux-brand-hover)",
  "color-primary-bg-active": "var(--nerux-brand-active)",
  "color-primary-bg-disabled": "var(--nerux-brand-disabled)",
  "color-primary-foreground": "var(--nerux-brand-foreground)",
  "color-primary-foreground-disabled": "var(--nerux-color-text-disabled)",
  "color-border-focus": "var(--nerux-brand-focus-ring)",
  "color-focus": "var(--nerux-brand-focus-ring)",
  "color-link": "var(--nerux-brand-base)",
};

const light: TokenMap = {
  "color-bg": "var(--nerux-primitive-color-neutral-50)",
  "color-surface-default": "var(--nerux-primitive-color-neutral-0)",
  "color-surface-hover": "var(--nerux-primitive-color-neutral-100)",
  "color-surface-active": "var(--nerux-primitive-color-neutral-200)",
  "color-surface-secondary": "var(--nerux-primitive-color-neutral-100)",
  "color-surface-tertiary": "var(--nerux-primitive-color-neutral-200)",
  "color-border-default": "var(--nerux-primitive-color-neutral-200)",
  "color-border-hover": "var(--nerux-primitive-color-neutral-300)",
  "color-text-default": "var(--nerux-primitive-color-neutral-900)",
  "color-text-secondary": "var(--nerux-primitive-color-neutral-700)",
  "color-text-disabled": "var(--nerux-primitive-color-neutral-500)",
  "color-text-inverse": "var(--nerux-primitive-color-neutral-0)",
  "color-neutral-bg-default": "var(--nerux-primitive-color-neutral-100)",
  "color-disabled-bg-default": "var(--nerux-primitive-color-neutral-200)",
  "color-secondary-bg-default": "var(--nerux-primitive-color-cyan-600)",
  "color-secondary-bg-hover":
    "color-mix(in oklch, var(--nerux-primitive-color-cyan-600) 88%, black)",
  "color-secondary-bg-active":
    "color-mix(in oklch, var(--nerux-primitive-color-cyan-600) 78%, black)",
  "color-secondary-text-default": "var(--nerux-primitive-color-neutral-0)",
  "color-secondary-text-hover": "var(--nerux-primitive-color-neutral-0)",
  "color-secondary-text-active": "var(--nerux-primitive-color-neutral-0)",
  "color-success": "var(--nerux-primitive-color-green-700)",
  "color-success-bg": "var(--nerux-primitive-color-green-200)",
  "color-success-text": "var(--nerux-primitive-color-green-900)",
  "color-warning": "var(--nerux-primitive-color-amber-700)",
  "color-warning-bg": "var(--nerux-primitive-color-amber-200)",
  "color-warning-text": "var(--nerux-primitive-color-amber-900)",
  "color-danger": "var(--nerux-primitive-color-red-700)",
  "color-danger-bg": "var(--nerux-primitive-color-red-200)",
  "color-danger-text": "var(--nerux-primitive-color-red-900)",
  "color-info": "var(--nerux-primitive-color-blue-600)",
  "color-info-bg": "var(--nerux-primitive-color-blue-200)",
  "color-info-text": "var(--nerux-primitive-color-blue-900)",
  "backdrop-blur": "blur(8px)",
  "backdrop-brightness": "brightness(0.7)",
};

const dark: TokenMap = {
  "color-bg": "var(--nerux-primitive-color-neutral-950)",
  "color-surface-default": "#181522",
  "color-surface-hover": "#211d2e",
  "color-surface-active": "#2a2539",
  "color-surface-secondary": "#1e1a2a",
  "color-surface-tertiary": "#2a2539",
  "color-border-default": "var(--nerux-primitive-color-neutral-800)",
  "color-border-hover": "#463d5c",
  "color-text-default": "var(--nerux-primitive-color-neutral-25)",
  "color-text-secondary": "var(--nerux-primitive-color-neutral-400)",
  "color-text-disabled": "var(--nerux-primitive-color-neutral-600)",
  "color-text-inverse": "var(--nerux-primitive-color-neutral-950)",
  "color-neutral-bg-default": "var(--nerux-primitive-color-neutral-800)",
  "color-disabled-bg-default": "#3a334a",
  "color-secondary-bg-default": "var(--nerux-primitive-color-cyan-400)",
  "color-secondary-bg-hover":
    "color-mix(in oklch, var(--nerux-primitive-color-cyan-400) 88%, white)",
  "color-secondary-bg-active":
    "color-mix(in oklch, var(--nerux-primitive-color-cyan-400) 78%, white)",
  "color-secondary-text-default": "var(--nerux-primitive-color-cyan-900)",
  "color-secondary-text-hover": "var(--nerux-primitive-color-cyan-900)",
  "color-secondary-text-active": "var(--nerux-primitive-color-cyan-900)",
  "color-success": "var(--nerux-primitive-color-green-400)",
  "color-success-bg": "var(--nerux-primitive-color-green-950)",
  "color-success-text": "var(--nerux-primitive-color-green-200)",
  "color-warning": "var(--nerux-primitive-color-amber-400)",
  "color-warning-bg": "var(--nerux-primitive-color-amber-950)",
  "color-warning-text": "var(--nerux-primitive-color-amber-200)",
  "color-danger": "var(--nerux-primitive-color-red-400)",
  "color-danger-bg": "var(--nerux-primitive-color-red-950)",
  "color-danger-text": "var(--nerux-primitive-color-red-200)",
  "color-info": "var(--nerux-primitive-color-blue-400)",
  "color-info-bg": "var(--nerux-primitive-color-blue-950)",
  "color-info-text": "var(--nerux-primitive-color-blue-200)",
  "backdrop-blur": "blur(8px)",
  "backdrop-brightness": "brightness(0.4)",
};

const contrastPairs: ContrastPair[] = [
  {
    label: "text-default/bg (light)",
    foreground: "#1b1725",
    background: "#f6f5fa",
  },
  {
    label: "text-default/surface (light)",
    foreground: "#1b1725",
    background: "#ffffff",
  },
  {
    label: "text-secondary/bg (light)",
    foreground: "#5c556e",
    background: "#f6f5fa",
  },
  {
    label: "text-secondary/surface (light)",
    foreground: "#5c556e",
    background: "#ffffff",
  },
  {
    label: "success-text/success-bg (light)",
    foreground: "#14532d",
    background: "#bbf7d0",
  },
  {
    label: "warning-text/warning-bg (light)",
    foreground: "#78350f",
    background: "#fde68a",
  },
  {
    label: "danger-text/danger-bg (light)",
    foreground: "#7f1d1d",
    background: "#fecaca",
  },
  {
    label: "info-text/info-bg (light)",
    foreground: "#1e3a8a",
    background: "#bfdbfe",
  },
  {
    label: "text-default/bg (dark)",
    foreground: "#fbfafc",
    background: "#0f0d15",
  },
  {
    label: "text-default/surface (dark)",
    foreground: "#fbfafc",
    background: "#181522",
  },
  {
    label: "text-secondary/bg (dark)",
    foreground: "#b4aec4",
    background: "#0f0d15",
  },
  {
    label: "text-secondary/surface (dark)",
    foreground: "#b4aec4",
    background: "#181522",
  },
  {
    label: "success-text/success-bg (dark)",
    foreground: "#bbf7d0",
    background: "#052e16",
  },
  {
    label: "warning-text/warning-bg (dark)",
    foreground: "#fde68a",
    background: "#451a03",
  },
  {
    label: "danger-text/danger-bg (dark)",
    foreground: "#fecaca",
    background: "#450a0a",
  },
  {
    label: "info-text/info-bg (dark)",
    foreground: "#bfdbfe",
    background: "#172554",
  },
];

const spacingAliases = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "12",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "gutter",
  "section",
  "component",
];

const radiusAliases = ["none", "xs", "sm", "md", "lg", "xl", "2xl", "full"];

const shadowAliases = [
  "none",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "inner",
];

const transitionAliases = [
  "instant",
  "fast",
  "base",
  "default",
  "mid",
  "slow",
  "slower",
  "slowest",
  "fast-in-out",
  "default-in-out",
  "slow-in-out",
  "colors-base",
  "transform-base",
];

const easeAliases = [
  "linear",
  "in",
  "out",
  "in-out",
  "bounce",
];

const aliases: TokenMap = {
  "--color-bg": "var(--nerux-color-bg)",
  "--color-surface-default": "var(--nerux-color-surface-default)",
  "--color-surface-hover": "var(--nerux-color-surface-hover)",
  "--color-surface-active": "var(--nerux-color-surface-active)",
  "--color-surface-secondary": "var(--nerux-color-surface-secondary)",
  "--color-border-default": "var(--nerux-color-border-default)",
  "--color-border-hover": "var(--nerux-color-border-hover)",
  "--color-border-focus": "var(--nerux-color-border-focus)",
  "--color-text-primary": "var(--nerux-color-text-default)",
  "--color-text-secondary": "var(--nerux-color-text-secondary)",
  "--color-text-disabled": "var(--nerux-color-text-disabled)",
  "--color-primary-bg-default": "var(--nerux-color-primary-bg-default)",
  "--color-primary-bg-hover": "var(--nerux-color-primary-bg-hover)",
  "--color-primary-bg-active": "var(--nerux-color-primary-bg-active)",
  "--color-primary-text-default": "var(--nerux-color-text-default)",
  "--color-primary-text-hover": "var(--nerux-color-text-default)",
  "--color-primary-text-active": "var(--nerux-color-text-default)",
  "--color-primary-text-disabled": "var(--nerux-color-text-disabled)",
  "--color-secondary-bg-default": "var(--nerux-color-secondary-bg-default)",
  "--color-secondary-bg-hover": "var(--nerux-color-secondary-bg-hover)",
  "--color-secondary-bg-active": "var(--nerux-color-secondary-bg-active)",
  "--color-secondary-text-default": "var(--nerux-color-secondary-text-default)",
  "--color-secondary-text-hover": "var(--nerux-color-secondary-text-hover)",
  "--color-secondary-text-active": "var(--nerux-color-secondary-text-active)",
  "--color-success": "var(--nerux-color-success)",
  "--color-success-bg-default": "var(--nerux-color-success-bg)",
  "--color-success-text-default": "var(--nerux-color-success-text)",
  "--color-warning": "var(--nerux-color-warning)",
  "--color-warning-bg-default": "var(--nerux-color-warning-bg)",
  "--color-warning-text-default": "var(--nerux-color-warning-text)",
  "--color-error": "var(--nerux-color-danger)",
  "--color-error-bg-default": "var(--nerux-color-danger-bg)",
  "--color-error-text-default": "var(--nerux-color-danger-text)",
  "--color-info-bg-default": "var(--nerux-color-info-bg)",
  "--color-info-text-default": "var(--nerux-color-info-text)",
  "--color-exito": "var(--nerux-color-success)",
  "--color-advertencia": "var(--nerux-color-warning)",
  "--color-informacion": "var(--nerux-color-info)",
  "--color-disabled-bg-default": "var(--nerux-color-disabled-bg-default)",
  "--color-neutral-bg-default": "var(--nerux-color-neutral-bg-default)",
  "--surface-table-header": "var(--nerux-color-surface-secondary)",
  "--border-width-default": "var(--nerux-border-width-default)",
  "--border-width-thin": "var(--nerux-border-width-thin)",
  "--border-width-thin-alt": "var(--nerux-border-width-thin-alt)",
  "--border-width-normal": "var(--nerux-border-width-normal)",
  "--border-width-thick": "var(--nerux-border-width-thick)",
  "--border-width-thicker": "var(--nerux-border-width-thicker)",
  "--border-style-solid": "var(--nerux-border-style-solid)",
  "--border-style-dashed": "var(--nerux-border-style-dashed)",
  "--border-style-dotted": "var(--nerux-border-style-dotted)",
  "--border-default": "var(--nerux-border-default)",
  "--border-input": "var(--nerux-border-input)",
  "--font-family-base": "var(--nerux-font-family-base)",
  "--font-family-heading": "var(--nerux-font-family-heading)",
  "--font-family-body": "var(--nerux-font-family-body)",
  "--font-size-xs": "var(--nerux-font-size-xs)",
  "--font-size-sm": "var(--nerux-font-size-sm)",
  "--font-size-md": "var(--nerux-font-size-md)",
  "--font-size-lg": "var(--nerux-font-size-lg)",
  "--font-size-xl": "var(--nerux-font-size-xl)",
  "--font-size-2xl": "var(--nerux-font-size-2xl)",
  "--font-size-caption": "var(--nerux-font-size-caption)",
  "--font-size-body": "var(--nerux-font-size-body)",
  "--font-size-subtitle": "var(--nerux-font-size-subtitle)",
  "--font-size-title": "var(--nerux-font-size-title)",
  "--font-weight-light": "var(--nerux-font-weight-light)",
  "--font-weight-normal": "var(--nerux-font-weight-normal)",
  "--font-weight-regular": "var(--nerux-font-weight-regular)",
  "--font-weight-medium": "var(--nerux-font-weight-medium)",
  "--font-weight-semibold": "var(--nerux-font-weight-semibold)",
  "--font-weight-bold": "var(--nerux-font-weight-bold)",
  "--line-height-tight": "var(--nerux-line-height-tight)",
  "--line-height-normal": "var(--nerux-line-height-normal)",
  "--line-height-relaxed": "var(--nerux-line-height-relaxed)",
  "--backdrop-blur": "var(--nerux-backdrop-blur)",
  "--backdrop-brightness": "var(--nerux-backdrop-brightness)",
};

for (const key of spacingAliases) {
  aliases[`--spacing-${key}`] = `var(--nerux-spacing-${key})`;
}

for (const key of radiusAliases) {
  aliases[`--border-radius-${key}`] = `var(--nerux-radius-${key})`;
  aliases[`--border-radius-${key}-alt`] = `var(--nerux-radius-${key})`;
}

for (const key of shadowAliases) {
  aliases[`--shadow-${key}`] = `var(--nerux-shadow-${key})`;
}

for (const key of transitionAliases) {
  aliases[`--transition-${key}`] = `var(--nerux-transition-${key})`;
}

for (const key of easeAliases) {
  aliases[`--ease-${key}`] = `var(--nerux-ease-${key})`;
}

export const semantic: SemanticSource = {
  shared,
  light,
  dark,
  aliases,
  contrastPairs,
};
