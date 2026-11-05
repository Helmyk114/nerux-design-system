import type { ElementType, JSX } from "react";
import clsx from "clsx";
import type { TextProps } from "./text.types";
import {
  textAlignClasses,
  textColorClasses,
  textDefaultElement,
  textDefaultWeight,
  textModifierClasses,
  textVariantClasses,
  textWeightClasses,
} from "./text.variants";

export function TextNerux<T extends ElementType = "p">({
  as,
  variant,
  size,
  weight,
  color = "default",
  align,
  truncate = false,
  italic = false,
  uppercase = false,
  noWrap = false,
  className,
  ...rest
}: TextProps<T>): JSX.Element {
  const resolvedVariant = variant ?? size ?? "body-md";
  const resolvedWeight = weight ?? textDefaultWeight[resolvedVariant];
  const Component = (as ??
    textDefaultElement[resolvedVariant]) as ElementType;

  return (
    <Component
      {...rest}
      className={clsx(
        textVariantClasses[resolvedVariant],
        textWeightClasses[resolvedWeight],
        textColorClasses[color],
        align && textAlignClasses[align],
        textModifierClasses({ truncate, noWrap, italic, uppercase }),
        className,
      )}
    />
  );
}
