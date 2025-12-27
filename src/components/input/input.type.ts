import type { InputProps as HeroInputProps } from "@heroui/react";

export interface InputProps {
  label: string;
  type?: HeroInputProps["type"];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}
