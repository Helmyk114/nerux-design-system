"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { NeruxThemeContext } from "./context";
import type {
  NeruxProviderProps,
  NeruxThemeContextValue,
  ThemePreference,
} from "./types";
import {
  DEFAULT_TARGET_SELECTOR,
  THEME_STORAGE_KEY,
  applyBrandVars,
  applyFavicon,
  getTarget,
  normalizeBrand,
  resolveTheme,
  writeStoredTheme,
  getLocalStorage,
} from "./utils";
import {
  createThemeStore,
  getSystemThemeServerSnapshot,
  getSystemThemeSnapshot,
  subscribeSystemTheme,
} from "./store";

export function NeruxProvider({
  children,
  theme: controlledTheme,
  onThemeChange,
  defaultTheme = "system",
  storageKey = THEME_STORAGE_KEY,
  persist = true,
  brand,
  targetSelector = DEFAULT_TARGET_SELECTOR,
}: NeruxProviderProps) {
  const store = useMemo(
    () => createThemeStore({ storageKey, defaultTheme, persist }),
    [storageKey, defaultTheme, persist],
  );
  const storedTheme = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
  const theme = controlledTheme ?? storedTheme;
  const systemDark = useSyncExternalStore(
    subscribeSystemTheme,
    getSystemThemeSnapshot,
    getSystemThemeServerSnapshot,
  );
  const resolvedTheme = resolveTheme(theme, systemDark);
  const normalizedBrand = useMemo(() => normalizeBrand(brand), [brand]);

  useEffect(() => {
    const target = getTarget(targetSelector);
    if (!target) return;
    const previous = target.getAttribute("data-theme");
    target.setAttribute("data-theme", resolvedTheme);
    return () => {
      if (previous === null) {
        target.removeAttribute("data-theme");
      } else {
        target.setAttribute("data-theme", previous);
      }
    };
  }, [resolvedTheme, targetSelector]);

  useEffect(() => {
    const target = getTarget(targetSelector);
    if (!target) return;
    const previousBrand = target.getAttribute("data-brand");
    target.setAttribute("data-brand", normalizedBrand.name);
    const restoreVars = applyBrandVars(target, normalizedBrand.vars);
    const restoreFavicon = applyFavicon(normalizedBrand.favicon);
    return () => {
      restoreFavicon();
      restoreVars();
      if (previousBrand === null) {
        target.removeAttribute("data-brand");
      } else {
        target.setAttribute("data-brand", previousBrand);
      }
    };
  }, [normalizedBrand, targetSelector]);

  const setTheme = useCallback(
    (next: ThemePreference) => {
      if (controlledTheme === undefined) {
        store.set(next);
      } else if (persist) {
        writeStoredTheme(getLocalStorage(), next, storageKey);
      }
      onThemeChange?.(next);
    },
    [
      controlledTheme,
      onThemeChange,
      persist,
      storageKey,
      store,
    ],
  );

  const value = useMemo<NeruxThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      brand: normalizedBrand.name,
    }),
    [theme, resolvedTheme, setTheme, normalizedBrand.name],
  );

  return (
    <NeruxThemeContext.Provider value={value}>
      {children}
    </NeruxThemeContext.Provider>
  );
}
