import clsx from "clsx";
import { type TextProps } from "./texto.types";
import { semanticMap, textVariants } from "./texto.variant";

export function TextNerux({
  variant = "body",
  children,
  className,
}: TextProps) {
  const Component = semanticMap[variant];

  return (
    <Component className={clsx(textVariants[variant], className)}>
      {children}
    </Component>
  );
}
