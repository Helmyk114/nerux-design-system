import type { TextVariant } from "./texto.types";

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
