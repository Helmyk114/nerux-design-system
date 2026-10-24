import { createContext } from "react";
import type { NeruxThemeContextValue } from "./types";

export const NeruxThemeContext =
  createContext<NeruxThemeContextValue | null>(null);
