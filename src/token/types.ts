// src/token/types.ts
// TypeScript type definitions for Nerux Design System tokens

// Color token types
export type ColorToken =
  // Primary colors
  | "--color-primary-bg-default"
  | "--color-primary-bg-hover"
  | "--color-primary-bg-active"
  | "--color-primary-text-default"
  | "--color-primary-text-hover"
  | "--color-primary-text-active"

  // Secondary colors
  | "--color-secondary-bg-default"
  | "--color-secondary-bg-hover"
  | "--color-secondary-bg-active"
  | "--color-secondary-text-default"
  | "--color-secondary-text-hover"
  | "--color-secondary-text-active"

  // Semantic colors
  | "--color-success-bg-default"
  | "--color-success-text-default"
  | "--color-warning-bg-default"
  | "--color-warning-text-default"
  | "--color-error-bg-default"
  | "--color-error-text-default"
  | "--color-info-bg-default"
  | "--color-info-text-default"

  // Neutral colors
  | "--color-bg"
  | "--color-surface-default"
  | "--color-surface-hover"
  | "--color-surface-active"
  | "--color-surface-secondary"
  | "--color-border-default"
  | "--color-border-hover"
  | "--color-border-focus"
  | "--color-text-primary"
  | "--color-text-secondary"
  | "--color-text-disabled";

// Spacing token types
export type SpacingToken =
  | "--spacing-xs"
  | "--spacing-sm"
  | "--spacing-md"
  | "--spacing-lg"
  | "--spacing-xl"
  | "--spacing-2xl"
  | "--spacing-gutter"
  | "--spacing-1"
  | "--spacing-2"
  | "--spacing-3"
  | "--spacing-4"
  | "--spacing-5"
  | "--spacing-6"
  | "--spacing-7"
  | "--spacing-8"
  | "--spacing-9"
  | "--spacing-10";

// Border token types
export type BorderToken =
  // Widths
  | "--border-width-thin"
  | "--border-width-default"
  | "--border-width-thick"

  // Radii
  | "--border-radius-none"
  | "--border-radius-sm"
  | "--border-radius-md"
  | "--border-radius-lg"
  | "--border-radius-xl"
  | "--border-radius-full";

// Shadow token types
export type ShadowToken =
  | "--shadow-none"
  | "--shadow-sm"
  | "--shadow-md"
  | "--shadow-lg"
  | "--shadow-xl"
  | "--shadow-2xl";

// Transition token types
export type TransitionToken =
  | "--transition-default"
  | "--transition-fast"
  | "--transition-slow"
  | "--ease-linear"
  | "--ease-in"
  | "--ease-out"
  | "--ease-in-out"
  | "--ease-in-quad"
  | "--ease-out-quad"
  | "--ease-in-out-quad"
  | "--ease-in-cubic"
  | "--ease-out-cubic"
  | "--ease-in-out-cubic"
  | "--ease-in-quart"
  | "--ease-out-quart"
  | "--ease-in-out-quart"
  | "--ease-in-quint"
  | "--ease-out-quint"
  | "--ease-in-out-quint";

// Typography token types
export type TypographyToken =
  | "--font-family-heading"
  | "--font-family-body"
  | "--font-size-xs"
  | "--font-size-sm"
  | "--font-size-md"
  | "--font-size-lg"
  | "--font-size-xl"
  | "--font-size-2xl"
  | "--font-weight-normal"
  | "--font-weight-medium"
  | "--font-weight-bold"
  | "--line-height-tight"
  | "--line-height-normal"
  | "--line-height-relaxed";

// Union type of all token types
export type TokenName =
  | ColorToken
  | SpacingToken
  | BorderToken
  | ShadowToken
  | TransitionToken
  | TypographyToken;

// Theme type
export type Theme = "light" | "dark";

// Token value type (CSS custom property value)
export type TokenValue = string;

// Token registry interface
export interface TokenRegistry {
  [key: string]: TokenValue;
}

// Theme-aware token getter
export type TokenGetter = (token: TokenName, theme?: Theme) => TokenValue;

// Utility types for component props
export interface TokenProps {
  className?: string;
  style?: React.CSSProperties;
}

// Helper type for token-based component variants
export type TokenVariant<T extends string> = {
  [K in T]: TokenName;
};

// Example usage in components:
/*
// Button component with token-based variants
interface ButtonVariants extends TokenVariant<'primary' | 'secondary'> {
  primary: '--color-primary-bg-default';
  secondary: '--color-secondary-bg-default';
}

const buttonVariants: ButtonVariants = {
  primary: '--color-primary-bg-default',
  secondary: '--color-secondary-bg-default',
};
*/
