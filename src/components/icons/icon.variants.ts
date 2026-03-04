import type { IconColor, IconSize, IconStroke } from "./icon.type";

export const sizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

export const colorMap: Record<IconColor, string> = {
  default: `text-(--color-border-default)`,
  primary: `text-(--color-primary-bg-default)`,
  disabled: `text-(--color-disabled-bg-default)`,
  error: `text-(--color-error)`,
  success: `text-(--color-exito)`,
  warning: `text-(--color-advertencia)`,
  informacion: `text-(--color-informacion)`,
};

export const strokeMap: Record<IconStroke, number> = {
  thin: 1,
  light: 1.25,
  regular: 1.5,
  medium: 1.75,
  bold: 2,
};
