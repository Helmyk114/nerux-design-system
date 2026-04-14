import clsx from "clsx";
import type { IconProps } from "./icon.type";
import * as TablerIcons from "@tabler/icons-react";
import { colorMap, sizeMap, strokeMap } from "./icon.variants";

export function IconNerux({
  name,
  size = "md",
  color = "default",
  stroke = "light",
  className,
}: IconProps) {
  const Component = TablerIcons[name] as React.ElementType;
  if (!Component) return null;

  return (
    <Component
      size={sizeMap[size]}
      stroke={strokeMap[stroke]}
      className={clsx(colorMap[color], className)}
    />
  );
}
