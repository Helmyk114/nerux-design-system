import React from "react";
import clsx from "clsx";

type TextVariant = "title" | "subtitle" | "body" | "caption";

interface TextProps {
  /** Tipo de texto semántico */
  variant?: TextVariant;
  /** Elemento HTML a renderizar */
  as?: keyof React.JSX.IntrinsicElements;
  /** Contenido */
  children: React.ReactNode;
  /** Clases extra si se necesitan */
  className?: string;
}

export function Text({
  variant = "body",
  as: Component = "p",
  children,
  className,
}: TextProps) {
  const variants: Record<TextVariant, string> = {
    title: clsx(
      "font-[var(--font-family-base)]",
      "text-[var(--font-size-title)]",
      "font-[var(--font-weight-semibold)]"
    ),

    subtitle: clsx(
      "font-[var(--font-family-base)]",
      "text-[var(--font-size-subtitle)]",
      "font-[var(--font-weight-medium)]"
    ),

    body: clsx(
      "font-[var(--font-family-base)]",
      "text-[var(--font-size-body)]",
      "font-[var(--font-weight-regular)]"
    ),

    caption: clsx(
      "font-[var(--font-family-base)]",
      "text-[var(--font-size-caption)]",
      "font-[var(--font-weight-regular)]"
    ),
  };

  return (
    <Component className={clsx(variants[variant], className)}>
      {children}
    </Component>
  );
}
