import { describe, expect, it, vi } from "vitest";
import { getThemeScript } from "./getThemeScript";
import {
  isThemePreference,
  normalizeBrand,
  readStoredTheme,
  resolveTheme,
  writeStoredTheme,
} from "./utils";

function createStorage(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial));
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => {
      data.set(key, value);
    },
    removeItem: (key: string) => {
      data.delete(key);
    },
    data,
  };
}

describe("theme utilities", () => {
  it("validates theme preferences", () => {
    expect(isThemePreference("light")).toBe(true);
    expect(isThemePreference("dark")).toBe(true);
    expect(isThemePreference("system")).toBe(true);
    expect(isThemePreference("sepia")).toBe(false);
    expect(isThemePreference(null)).toBe(false);
  });

  it("resolves system themes", () => {
    expect(resolveTheme("system", true)).toBe("dark");
    expect(resolveTheme("system", false)).toBe("light");
    expect(resolveTheme("light", true)).toBe("light");
    expect(resolveTheme("dark", false)).toBe("dark");
  });

  it("reads and writes persisted preferences", () => {
    const storage = createStorage({ "nerux-theme": "dark" });
    expect(readStoredTheme(storage, "nerux-theme")).toBe("dark");
    expect(readStoredTheme(storage, "missing")).toBeNull();
    writeStoredTheme(storage, "system", "nerux-theme");
    expect(storage.data.get("nerux-theme")).toBe("system");
    writeStoredTheme(storage, "light", "missing");
    expect(storage.data.get("missing")).toBe("light");
  });

  it("ignores invalid stored values", () => {
    const storage = createStorage({ "nerux-theme": "sepia" });
    expect(readStoredTheme(storage, "nerux-theme")).toBeNull();
  });

  it("normalizes string and object brands", () => {
    expect(normalizeBrand()).toEqual({ name: "nerux", vars: {} });
    expect(normalizeBrand("nerux")).toEqual({ name: "nerux", vars: {} });

    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    expect(normalizeBrand("acme")).toEqual({ name: "nerux", vars: {} });
    expect(warn).toHaveBeenCalledWith(
      '[Nerux] Unknown brand "acme". Falling back to "nerux".',
    );
    warn.mockRestore();

    const brand = normalizeBrand({
      name: "ocean",
      primary: "#0ea5e9",
      foreground: "#001122",
      logoLight: "/logo-light.svg",
      logoDark: "/logo-dark.svg",
      favicon: "/favicon.ico",
    });
    expect(brand.name).toBe("ocean");
    expect(brand.vars["--nerux-brand-base"]).toBe("#0ea5e9");
    expect(brand.vars["--nerux-brand-foreground"]).toBe("#001122");
    expect(brand.vars["--nerux-brand-logo-light"]).toBe(
      'url("/logo-light.svg")',
    );
    expect(brand.vars["--nerux-brand-logo-dark"]).toBe(
      'url("/logo-dark.svg")',
    );
    expect(brand.vars["--nerux-brand-favicon"]).toBe('url("/favicon.ico")');
    expect(brand.favicon).toBe("/favicon.ico");
  });

  it("escapes logo URLs", () => {
    const brand = normalizeBrand({
      primary: "#0ea5e9",
      logoLight: 'https://cdn.example/logo"quoted.svg',
    });
    expect(brand.vars["--nerux-brand-logo-light"]).toBe(
      'url("https://cdn.example/logo\\"quoted.svg")',
    );
  });

  it("generates a deterministic anti-FOUC script", () => {
    const first = getThemeScript();
    const second = getThemeScript();
    expect(second).toBe(first);
    expect(first).toContain('"storageKey":"nerux-theme"');
    expect(first).toContain('"defaultTheme":"system"');
    expect(first).toContain('"brandName":"nerux"');
    expect(first).toContain("data-theme");
    expect(first).toContain("data-brand");
  });

  it("includes custom brand variables and favicon in the script", () => {
    const script = getThemeScript({
      brand: {
        name: "ocean",
        primary: "#0ea5e9",
        foreground: "#001122",
        favicon: "/favicon.ico",
      },
    });
    expect(script).toContain('"brandName":"ocean"');
    expect(script).toContain('"--nerux-brand-base":"#0ea5e9"');
    expect(script).toContain('"--nerux-brand-foreground":"#001122"');
    expect(script).toContain('"favicon":"/favicon.ico"');
  });
});
