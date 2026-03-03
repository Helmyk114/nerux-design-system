import type { TextVariant } from "./texto.types";

export const semanticMap: Record<TextVariant, React.ElementType> = {
  title: "h1",
  subtitle: "h2",
  body: "p",
  caption: "span",
  error: "span",
};

export const textVariants: Record<TextVariant, string> = {
  title: `font-[var(--font-weight-semibold)] text-(--color-primary-text-default)`,
  subtitle: `font-[var(--font-weight-medium)] text-(--color-primary-text-default)`,
  body: `font-[var(--font-weight-regular)] text-(--color-primary-text-default)`,
  caption: `font-[var(--font-weight-regular)] text-(--color-primary-text-default)`,
  error: `font-[var(--font-weight-light)] text-[var(--color-error)]`,
};
