import { Input as InputHero } from "@heroui/react";
import type { InputProps } from "./input.type";
import { SemanticIcons } from "../icons/semantic";
import { TextNerux } from "../texto";

export function InputNerux({
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required,
  disabled = false,
  startIcon,
  endIcon,
  minLength,
  maxLength
}: InputProps) {
  const hasError = Boolean(error);

  return (
    <InputHero
      name={name}
      label={label}
      labelPlacement="outside"
      variant="bordered"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      errorMessage={
        hasError ? (
          <div className="flex items-center gap-1">
            <SemanticIcons.advertencia size={16}/>
            <TextNerux variant="error">{error}</TextNerux>
          </div>
        ) : null
      }
      isInvalid={hasError}
      isRequired={required}
      isDisabled={disabled}
      startContent={startIcon}
      endContent={endIcon}
      maxLength={maxLength}
      minLength={minLength}
      classNames={{
        label: ["focus: !text-[var(--color-primary-text-default)]"],
        inputWrapper: [
          "!text-[var(--color-primary-text-default)]",
          "focus-within: !border-[var(--color-primary-bg-default)]",
          "hover: !border-[var(--color-primary-bg-default)]",
          hasError ? "!border-(--color-error)" : ""
        ],
      }}
    />
  );
}
