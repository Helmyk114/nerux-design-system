import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { buildArtifacts, validateContrast } from "../../scripts/build-tokens";
import { brands } from "./source/brands";
import { bestForeground, contrastRatio } from "./source/color";
import { semantic } from "./source/semantic";

function readGenerated(name: string): string {
  return readFileSync(
    new URL(`./generated/${name}`, import.meta.url),
    "utf8",
  );
}

const canonicalCss = [
  "primitives.css",
  "semantic.css",
  "brands.css",
  "heroui.css",
]
  .map(readGenerated)
  .join("\n");

const canonicalTokens = new Set(
  [...canonicalCss.matchAll(/(--nerux-[a-z0-9-]+)\s*:/g)].map(
    (match) => match[1],
  ),
);

const aliasesCss = readGenerated("aliases.css");
const aliasEntries = [
  ...aliasesCss.matchAll(
    /(--[a-z0-9-]+)\s*:\s*var\((--nerux-[a-z0-9-]+)\);/g,
  ),
].map((match) => ({ alias: match[1], target: match[2] }));

describe("generated tokens", () => {
  it("is deterministic and matches the committed artifacts", () => {
    const first = buildArtifacts();
    const second = buildArtifacts();
    expect(second).toEqual(first);
    for (const [file, content] of first) {
      expect(readGenerated(file)).toBe(content);
    }
  });

  it("emits every semantic and primitive token", () => {
    const primitives = readGenerated("primitives.css");
    const semanticCss = readGenerated("semantic.css");
    for (const key of Object.keys(semantic.shared)) {
      expect(semanticCss).toContain(`--nerux-${key}:`);
    }
    for (const key of Object.keys(semantic.light)) {
      expect(semanticCss).toContain(`--nerux-${key}:`);
    }
    for (const key of Object.keys(semantic.dark)) {
      expect(semanticCss).toContain(`--nerux-${key}:`);
    }
    expect(primitives).toContain("--nerux-spacing-4:");
    expect(primitives).toContain("--nerux-radius-lg:");
    expect(primitives).toContain("--nerux-font-size-body:");
  });

  it("resolves every legacy alias to a canonical token", () => {
    expect(aliasEntries.length).toBeGreaterThan(100);
    for (const { alias, target } of aliasEntries) {
      expect(target).toMatch(/^--nerux-/);
      expect(canonicalTokens.has(target), `${alias} -> ${target}`).toBe(
        true,
      );
    }
  });

  it("covers the legacy tokens used by components", () => {
    const usedByComponents = [
      "--color-primary-text-default",
      "--color-primary-text-disabled",
      "--color-primary-bg-default",
      "--color-secondary-text-default",
      "--color-neutral-bg-default",
      "--color-disabled-bg-default",
      "--color-border-default",
      "--color-surface-default",
      "--color-error",
      "--color-exito",
      "--color-advertencia",
      "--color-informacion",
      "--color-success",
      "--color-warning",
      "--spacing-1",
      "--border-width-thin",
      "--border-radius-lg",
      "--font-weight-light",
      "--font-weight-regular",
      "--font-weight-medium",
      "--font-weight-semibold",
      "--font-weight-bold",
      "--font-size-caption",
      "--font-size-body",
      "--font-size-subtitle",
      "--font-size-title",
    ];
    const aliasNames = new Set(aliasEntries.map((entry) => entry.alias));
    for (const name of usedByComponents) {
      expect(aliasNames.has(name), name).toBe(true);
    }
  });

  it("maps HeroUI base variables to the Nerux contract", () => {
    const heroui = readGenerated("heroui.css");
    for (const name of [
      "--accent",
      "--accent-foreground",
      "--background",
      "--foreground",
      "--surface",
      "--surface-foreground",
      "--border",
      "--focus",
      "--field-background",
      "--radius",
    ]) {
      expect(heroui).toContain(`${name}: var(--nerux-`);
    }
  });

  it("derives the brand scale with native CSS", () => {
    const brandCss = readGenerated("brands.css");
    expect(brandCss).toContain("color-mix(in oklch");
    expect(brandCss).toContain("contrast-color");
    for (const name of [
      "--nerux-brand-base",
      "--nerux-brand-hover",
      "--nerux-brand-active",
      "--nerux-brand-disabled",
      "--nerux-brand-focus-ring",
      "--nerux-brand-foreground",
    ]) {
      expect(brandCss).toContain(`${name}:`);
    }
    expect(brandCss).toContain(':root[data-brand="nerux"]');
  });

  it("emits generated TypeScript token unions", () => {
    const types = readGenerated("types.ts");
    expect(types).toContain("export type TokenName =");
    expect(types).toContain("export type LegacyToken =");
    expect(types).toContain('export type BrandName = "nerux";');
  });
});

describe("contrast", () => {
  it("passes all semantic and brand pairs at AA", () => {
    expect(() => validateContrast()).not.toThrow();
    for (const pair of semantic.contrastPairs) {
      expect(
        contrastRatio(pair.foreground, pair.background),
        pair.label,
      ).toBeGreaterThanOrEqual(pair.minimum ?? 4.5);
    }
  });

  it("keeps every brand base accessible in both themes", () => {
    for (const [name, brand] of Object.entries(brands)) {
      for (const theme of ["light", "dark"] as const) {
        const base = brand.base[theme];
        const foreground = bestForeground(base);
        expect(
          contrastRatio(foreground, base),
          `${name}/${theme}`,
        ).toBeGreaterThanOrEqual(4.5);
      }
    }
  });
});
