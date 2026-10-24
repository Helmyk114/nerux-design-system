import type { ReactNode } from "react";

export type ThemePreference = "light" | "dark" | "system";

export type ResolvedTheme = "light" | "dark";

export interface BrandConfig {
  name?: string;
  primary: string;
  foreground?: string;
  logoLight?: string;
  logoDark?: string;
  favicon?: string;
}

export type BrandInput = string | BrandConfig;

export interface NeruxThemeOptions {
  storageKey?: string;
  defaultTheme?: ThemePreference;
  persist?: boolean;
  brand?: BrandInput;
  targetSelector?: string;
}

export interface NeruxProviderProps extends NeruxThemeOptions {
  children: ReactNode;
  theme?: ThemePreference;
  onThemeChange?: (theme: ThemePreference) => void;
}

export interface NeruxThemeContextValue {
  theme: ThemePreference;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemePreference) => void;
  brand: string;
}
