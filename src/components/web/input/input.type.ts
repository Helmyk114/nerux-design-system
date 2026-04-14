import type { InputProps as HeroInputProps } from "@heroui/react";
import type { IconName } from "../icons/icon.type";

export interface InputProps extends Omit<HeroInputProps, "startIcon" | "endIcon" | "onChange"> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  startIcon?: IconName;
  endIcon?: IconName;
  error?: string;
}
