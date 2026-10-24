import type { NeruxThemeOptions } from "./types";
import {
  DEFAULT_TARGET_SELECTOR,
  THEME_STORAGE_KEY,
  normalizeBrand,
} from "./utils";

export type ThemeScriptOptions = NeruxThemeOptions;

export function getThemeScript(
  options: ThemeScriptOptions = {},
): string {
  const {
    storageKey = THEME_STORAGE_KEY,
    defaultTheme = "system",
    persist = true,
    brand,
    targetSelector = DEFAULT_TARGET_SELECTOR,
  } = options;
  const normalized = normalizeBrand(brand);
  const payload = JSON.stringify({
    storageKey,
    defaultTheme,
    persist,
    targetSelector,
    brandName: normalized.name,
    brandVars: normalized.vars,
    favicon: normalized.favicon ?? null,
  });

  return `(function(){try{var o=${payload};var d=document;var r=d.querySelector(o.targetSelector)||d.documentElement;var p=o.defaultTheme;if(o.persist){try{var s=window.localStorage.getItem(o.storageKey);if(s==="light"||s==="dark"||s==="system")p=s}catch(e){}}var m=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;var t=p==="dark"||(p==="system"&&m)?"dark":"light";r.setAttribute("data-theme",t);r.setAttribute("data-brand",o.brandName);r.style.colorScheme=t;var v=o.brandVars;for(var k in v){if(Object.prototype.hasOwnProperty.call(v,k))r.style.setProperty(k,v[k])}if(o.favicon){var l=d.querySelector('link[data-nerux-favicon]');if(!l){l=d.createElement("link");l.rel="icon";l.setAttribute("data-nerux-favicon","");d.head.appendChild(l)}l.setAttribute("href",o.favicon)}}catch(e){}})();`;
}
