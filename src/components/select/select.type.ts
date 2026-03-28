import type { Key } from "@heroui/react";

interface SelectOption {
  id: string | number;
  name: string;
  description?: string;
}

export interface SelectProps{
  value: Key | null;
  onChange: (value: Key | null) => void;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options: SelectOption[];
  error?: string;
}
