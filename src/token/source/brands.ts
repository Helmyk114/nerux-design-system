import type { BrandDefinition } from "./types";

export const brands: Record<string, BrandDefinition> = {
  nerux: {
    name: "nerux",
    base: {
      light: "#7c3aed",
      dark: "#8b5cf6",
    },
  },
};

export const defaultBrand = "nerux";

export function isKnownBrand(name: string): boolean {
  return Object.prototype.hasOwnProperty.call(brands, name);
}
