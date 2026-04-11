import clsx from "clsx";
import { type TextProps } from "./texto.types";
import {
  colorVariants,
  semanticMap,
  textVariants,
  weightVariants,
} from "./texto.variant";

export function TextNerux({
  variant = "body",
  children,
  color,
  weight,
  as,
  italic,
}: TextProps) {
  const Component = as || semanticMap[variant];
  const colorClass = color ? colorVariants[color] : "";
  const weightClass = weight ? weightVariants[weight] : "";

  return (
    <Component
      className={clsx(
        textVariants[variant],
        italic && "italic",
        colorClass,
        weightClass,
      )}
    >
      {children}
    </Component>
  );
}
