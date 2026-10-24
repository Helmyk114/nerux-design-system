import { defaultBrand, isKnownBrand } from "../token/source/brands";
import type {
  BrandInput,
  ResolvedTheme,
  ThemePreference,
} from "./types";

export const THEME_STORAGE_KEY = "nerux-theme";
export const DEFAULT_TARGET_SELECTOR = "html";

export interface NormalizedBrand {
  name: string;
  vars: Record<string, string>;
  favicon?: string;
}

export function isThemePreference(
  value: unknown,
): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}

export function resolveTheme(
  preference: ThemePreference,
  prefersDark: boolean,
): ResolvedTheme {
  if (preference === "system") return prefersDark ? "dark" : "light";
  return preference;
}

export function getSystemPrefersDark(): boolean {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return false;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function getLocalStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function readStoredTheme(
  storage: Pick<Storage, "getItem"> | null,
  storageKey: string = THEME_STORAGE_KEY,
): ThemePreference | null {
  if (!storage) return null;
  try {
    const value = storage.getItem(storageKey);
    return isThemePreference(value) ? value : null;
  } catch {
    return null;
  }
}

export function writeStoredTheme(
  storage: Pick<Storage, "setItem"> | null,
  theme: ThemePreference,
  storageKey: string = THEME_STORAGE_KEY,
): void {
  if (!storage) return;
  try {
    storage.setItem(storageKey, theme);
  } catch {
    // Storage can be unavailable in private or restricted contexts.
  }
}

export function getTarget(
  selector: string = DEFAULT_TARGET_SELECTOR,
): HTMLElement | null {
  if (typeof document === "undefined") return null;
  try {
    return (
      document.querySelector<HTMLElement>(selector) ??
      document.documentElement
    );
  } catch {
    return document.documentElement;
  }
}

function isDevEnvironment(): boolean {
  const env = (import.meta as ImportMeta & { env?: { DEV?: boolean } }).env;
  return env?.DEV === true;
}

function cssUrl(value: string): string {
  const escaped = value
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\a ");
  return `url("${escaped}")`;
}

export function normalizeBrand(brand?: BrandInput): NormalizedBrand {
  if (brand === undefined) {
    return { name: defaultBrand, vars: {} };
  }
  if (typeof brand === "string") {
    if (isKnownBrand(brand)) {
      return { name: brand, vars: {} };
    }
    if (isDevEnvironment()) {
      console.warn(
        `[Nerux] Unknown brand "${brand}". Falling back to "${defaultBrand}".`,
      );
    }
    return { name: defaultBrand, vars: {} };
  }

  const name = brand.name ?? "custom";
  const vars: Record<string, string> = {
    "--nerux-brand-name": JSON.stringify(name),
    "--nerux-brand-base": brand.primary,
  };
  if (brand.foreground) {
    vars["--nerux-brand-foreground"] = brand.foreground;
  }
  if (brand.logoLight) {
    vars["--nerux-brand-logo-light"] = cssUrl(brand.logoLight);
  }
  if (brand.logoDark) {
    vars["--nerux-brand-logo-dark"] = cssUrl(brand.logoDark);
  }
  if (brand.favicon) {
    vars["--nerux-brand-favicon"] = cssUrl(brand.favicon);
  }
  return { name, vars, favicon: brand.favicon };
}

export function applyBrandVars(
  target: HTMLElement,
  vars: Record<string, string>,
): () => void {
  const previous = new Map<string, [string, string]>();
  for (const [name, value] of Object.entries(vars)) {
    previous.set(name, [
      target.style.getPropertyValue(name),
      target.style.getPropertyPriority(name),
    ]);
    target.style.setProperty(name, value);
  }
  return () => {
    for (const [name, [value, priority]] of previous) {
      if (value) {
        target.style.setProperty(name, value, priority);
      } else {
        target.style.removeProperty(name);
      }
    }
  };
}

export function applyFavicon(favicon?: string): () => void {
  if (!favicon || typeof document === "undefined") {
    return () => undefined;
  }

  let link = document.querySelector<HTMLLinkElement>(
    'link[data-nerux-favicon]',
  );
  let created = false;
  const previousHref = link?.getAttribute("href") ?? null;

  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    link.setAttribute("data-nerux-favicon", "");
    document.head.appendChild(link);
    created = true;
  }

  link.setAttribute("href", favicon);

  return () => {
    if (created) {
      link?.remove();
      return;
    }
    if (previousHref === null) {
      link?.removeAttribute("href");
    } else {
      link?.setAttribute("href", previousHref);
    }
  };
}
