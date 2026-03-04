import type { InputProps as HeroInputProps } from "@heroui/react";
import type { IconName } from "../icons/icon.type";

export interface InputProps {
  name: string;
  label: string;
  type?: HeroInputProps["type"];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  startIcon?: IconName;
  endIcon?: IconName;
  minLength?: number;
  maxLength?: number;
}
