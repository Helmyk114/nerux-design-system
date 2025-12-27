import { Input as InputHero } from "@heroui/react";
import type { InputProps } from "./input.type";

export function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required,
  disabled = false,
}: InputProps) {
  return (
    <InputHero
      label={label}
      labelPlacement="outside"
      variant="bordered"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      errorMessage={error}
      isRequired={required}
      isDisabled={disabled}
      classNames={{
        label: ["font-[var(--font-family-base)]"],
      }}
    />
  );
}
