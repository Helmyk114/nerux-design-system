export type ThemeName = "light" | "dark";

export type TokenMap = Record<string, string>;

export type ThemeTokenMap = Record<ThemeName, TokenMap>;

export interface BrandDefinition {
  name: string;
  base: Record<ThemeName, string>;
  logoLight?: string;
  logoDark?: string;
  favicon?: string;
}

export interface ContrastPair {
  foreground: string;
  background: string;
  label: string;
  minimum?: number;
}

export interface SemanticSource {
  shared: TokenMap;
  light: TokenMap;
  dark: TokenMap;
  aliases: TokenMap;
  contrastPairs: ContrastPair[];
}
