"use client";

import { useContext } from "react";
import { NeruxThemeContext } from "./context";
import type { NeruxThemeContextValue } from "./types";

export function useNeruxTheme(): NeruxThemeContextValue {
  const context = useContext(NeruxThemeContext);
  if (!context) {
    throw new Error(
      "useNeruxTheme must be used within a NeruxProvider",
    );
  }
  return context;
}
