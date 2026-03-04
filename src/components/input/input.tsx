import { Input as InputHero } from "@heroui/react";
import type { InputProps } from "./input.type";
import { TextNerux } from "../texto";
import { useState } from "react";
import { IconNerux } from "../icons/icon";

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
  maxLength,
}: InputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const hasError = Boolean(error);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const inputType =
    type === "password" ? (isVisible ? "text" : "password") : type;

  return (
    <InputHero
      name={name}
      label={label}
      labelPlacement="outside"
      variant="bordered"
      type={inputType}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      errorMessage={
        hasError ? (
          <div className="flex items-center gap-1">
            <IconNerux name="IconAlertTriangle" size="sm" color="error" />
            <TextNerux variant="error">{error}</TextNerux>
          </div>
        ) : null
      }
      isInvalid={hasError}
      isRequired={required}
      isDisabled={disabled}
      startContent={startIcon}
      endContent={
        type === "password" ? (
          <button
            aria-label="toggle password visibility"
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <IconNerux name="IconEyeClosed" />
            ) : (
              <IconNerux name="IconEye" />
            )}
          </button>
        ) : endIcon ? (
          <IconNerux name={endIcon} />
        ) : null
      }
      maxLength={maxLength}
      minLength={minLength}
      classNames={{
        label: ["focus: !text-(--color-primary-text-default)"],
        inputWrapper: [
          "!text-(--color-primary-text-default)",
          "focus-within:!border-[var(--color-primary-bg-default)]",
          "hover:!border-[var(--color-primary-bg-default)]",
          "!border-[var(--color-border-default)]",
          hasError ? "!border-(--color-error) !text-(--color-error)" : "",
        ],
      }}
    />
  );
}
