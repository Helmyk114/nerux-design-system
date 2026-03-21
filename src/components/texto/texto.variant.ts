import type { ColorVariant, TextVariant, WeightVariant } from "./texto.types";

export const semanticMap: Record<TextVariant, React.ElementType> = {
  title: "h1",
  subtitle: "h2",
  body: "p",
  caption: "span",
  error: "span",
};

export const textVariants: Record<TextVariant, string> = {
  title: `font-[var(--font-weight-semibold)] text-(color:--color-primary-text-default) text-(size:--font-size-title)`,
  subtitle: `font-[var(--font-weight-medium)] text-(color:--color-primary-text-default) text-(size:--font-size-subtitle)`,
  body: `font-[var(--font-weight-regular)] text-(color:--color-primary-text-default) text-(size:--font-size-body)`,
  caption: `font-[var(--font-weight-regular)] text-(color:--color-primary-text-default) text-(size:--font-size-caption)`,
  error: `font-[var(--font-weight-light)] text-[var(--color-error)]`,
};

export const weightVariants: Record<WeightVariant, string> = {
  light: `font-[var(--font-weight-light)]`,
  regular: `font-[var(--font-weight-regular)]`,
  medium: `font-[var(--font-weight-medium)]`,
  semibold: `font-[var(--font-weight-semibold)]`,
  bold: `font-[var(--font-weight-bold)]`,
};

export const colorVariants: Record<ColorVariant, string> = {
  primary: `text-(color:--color-primary-text-default)`,
  secondary: `text-(color:--color-secondary-text-default)`,
  error: `text-(color:--color-error)`,
  success: `text-(color:--color-success)`,
  warning: `text-(color:--color-warning)`,
}