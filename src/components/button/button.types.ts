import type { ButtonProps as HeroButtonProps } from "@heroui/button";
import type { IconName } from "../icons/icon.type";

export type ButtonColor = "primary" | "disabled" | "danger" | "neutral";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<HeroButtonProps , "variant" | "color" | "size" | "startIcon" | "endIcon"> {
  color: ButtonColor;
  size?: ButtonSize;
  startIcon?: IconName;
  endIcon?: IconName;
  type?: "button" | "submit" | "reset";
}
