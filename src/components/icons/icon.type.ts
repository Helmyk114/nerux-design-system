import * as TablerIcons from "@tabler/icons-react";

export type IconName = keyof typeof TablerIcons;

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";
export type IconStroke = "thin" | "light" | "regular" | "medium" | "bold";
export type IconColor =
  | "default"
  | "primary"
  | "disabled"
  | "error"
  | "success"
  | "warning"
  | "informacion";

export interface IconProps {
  name: IconName;
  size?: IconSize;
  color?: IconColor;
  stroke?: IconStroke;
  className?: string;
}
