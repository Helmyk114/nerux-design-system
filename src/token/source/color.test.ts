import { describe, expect, it } from "vitest";
import {
  bestForeground,
  contrastRatio,
  hexToRgb,
  normalizeHex,
  relativeLuminance,
} from "./color";

describe("color utilities", () => {
  it("normalizes short hex values", () => {
    expect(normalizeHex("#abc")).toBe("#aabbcc");
    expect(normalizeHex("#abcd")).toBe("#aabbccdd");
    expect(normalizeHex("a1b2c3")).toBe("#a1b2c3");
  });

  it("rejects malformed hex values", () => {
    expect(() => normalizeHex("#12")).toThrow();
    expect(() => normalizeHex("#gggggg")).toThrow();
  });

  it("converts hex to rgb", () => {
    expect(hexToRgb("#7c3aed")).toEqual({ r: 124, g: 58, b: 237 });
  });

  it("computes WCAG contrast for black and white", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 5);
    expect(contrastRatio("#ffffff", "#ffffff")).toBeCloseTo(1, 5);
    expect(contrastRatio("#ffffff", "#000000")).toBeCloseTo(21, 5);
  });

  it("keeps relative luminance ordered", () => {
    expect(relativeLuminance("#000000")).toBeLessThan(
      relativeLuminance("#7c3aed"),
    );
    expect(relativeLuminance("#7c3aed")).toBeLessThan(
      relativeLuminance("#ffffff"),
    );
  });

  it("handles saturated, gray and boundary colors", () => {
    expect(contrastRatio("#ff0000", "#ffffff")).toBeCloseTo(3.998, 2);
    expect(bestForeground("#ff0000")).toBe("#000000");
    expect(bestForeground("#808080")).toBe("#000000");
    expect(contrastRatio("#777777", "#ffffff")).toBeCloseTo(4.478, 2);
    expect(contrastRatio("#ffffff", "#7c3aed")).toBeCloseTo(
      contrastRatio("#7c3aed", "#ffffff"),
      5,
    );
  });

  it("picks the foreground with the highest contrast", () => {
    expect(bestForeground("#000000")).toBe("#ffffff");
    expect(bestForeground("#ffffff")).toBe("#000000");
    expect(bestForeground("#7c3aed")).toBe("#ffffff");
    expect(contrastRatio(bestForeground("#8b5cf6"), "#8b5cf6")).toBeGreaterThanOrEqual(
      4.5,
    );
  });
});
