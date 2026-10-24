export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export function normalizeHex(value: string): string {
  const hex = value.trim().replace(/^#/, "");
  if (!/^[0-9a-f]+$/i.test(hex)) {
    throw new Error(`Invalid hex color: ${value}`);
  }
  if (hex.length === 3 || hex.length === 4) {
    return `#${hex
      .split("")
      .map((char) => `${char}${char}`)
      .join("")}`;
  }
  if (hex.length === 6 || hex.length === 8) {
    return `#${hex}`;
  }
  throw new Error(`Invalid hex color: ${value}`);
}

export function hexToRgb(value: string): Rgb {
  const hex = normalizeHex(value);
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

export function relativeLuminance(value: string): number {
  const { r, g, b } = hexToRgb(value);
  const channel = (component: number) => {
    const normalized = component / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(foreground: string, background: string): number {
  const light = Math.max(
    relativeLuminance(foreground),
    relativeLuminance(background),
  );
  const dark = Math.min(
    relativeLuminance(foreground),
    relativeLuminance(background),
  );
  return (light + 0.05) / (dark + 0.05);
}

export function bestForeground(background: string): string {
  const white = contrastRatio("#ffffff", background);
  const black = contrastRatio("#000000", background);
  return white >= black ? "#ffffff" : "#000000";
}

export function isHexColor(value: string): boolean {
  return /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(value.trim());
}

export function isCssColor(value: string): boolean {
  const trimmed = value.trim();
  if (isHexColor(trimmed)) return true;
  return /^(rgb|rgba|hsl|hsla|oklch|oklab|lab|lch|color)\(.+\)$/i.test(trimmed);
}
