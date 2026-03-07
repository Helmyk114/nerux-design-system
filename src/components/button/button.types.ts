import type { IconName } from "../icons/icon.type";

type ButtonVariant = "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "ghost"
export type ButtonColor = "primary" | "disabled" | "danger" | "neutral";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  color: ButtonColor;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  startIcon?: IconName;
  endIcon?: IconName;
  type?: "button" | "submit" | "reset";
  onPress?: () => void;
}
