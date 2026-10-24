import type { ThemePreference } from "./types";
import {
  getLocalStorage,
  getSystemPrefersDark,
  readStoredTheme,
  writeStoredTheme,
} from "./utils";

export interface ThemeStoreOptions {
  storageKey: string;
  defaultTheme: ThemePreference;
  persist: boolean;
  storage?: Pick<Storage, "getItem" | "setItem"> | null;
}

export interface ThemeStore {
  getSnapshot: () => ThemePreference;
  getServerSnapshot: () => ThemePreference;
  subscribe: (listener: () => void) => () => void;
  set: (theme: ThemePreference) => void;
}

export function createThemeStore({
  storageKey,
  defaultTheme,
  persist,
  storage,
}: ThemeStoreOptions): ThemeStore {
  let current = defaultTheme;
  let initialized = false;
  const listeners = new Set<() => void>();

  const getStorage = () =>
    storage === undefined ? getLocalStorage() : storage;

  const initialize = () => {
    if (initialized) return;
    initialized = true;
    if (!persist) return;
    const stored = readStoredTheme(getStorage(), storageKey);
    if (stored) current = stored;
  };

  return {
    getSnapshot() {
      initialize();
      return current;
    },
    getServerSnapshot() {
      return defaultTheme;
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    set(next) {
      current = next;
      if (persist) {
        writeStoredTheme(getStorage(), next, storageKey);
      }
      listeners.forEach((listener) => listener());
    },
  };
}

export function subscribeSystemTheme(listener: () => void): () => void {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return () => undefined;
  }
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }
  media.addListener(listener);
  return () => media.removeListener(listener);
}

export function getSystemThemeSnapshot(): boolean {
  return getSystemPrefersDark();
}

export function getSystemThemeServerSnapshot(): boolean {
  return false;
}
