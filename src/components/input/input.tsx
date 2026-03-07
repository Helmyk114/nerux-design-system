import { Input as InputHero } from "@heroui/react";
import type { InputProps } from "./input.type";
import { TextNerux } from "../texto";
import { useState } from "react";
import { IconNerux } from "../icons/icon";

export function InputNerux({
  type = "text",
  error,
  startIcon,
  endIcon,
  ...props
}: InputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const hasError = Boolean(error);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const inputType =
    type === "password" ? (isVisible ? "text" : "password") : type;

  return (
    <InputHero
      {...props}
      labelPlacement="outside"
      variant="bordered"
      type={inputType}
      errorMessage={
        hasError ? (
          <div className="flex items-center gap-1">
            <IconNerux name="IconAlertTriangle" size="sm" color="error" />
            <TextNerux variant="error">{error}</TextNerux>
          </div>
        ) : null
      }
      isInvalid={hasError}
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
      classNames={{
        label: [
          "focus: !text-(--color-primary-text-default)",
          hasError ? "!text-(--color-error)" : "",
        ],
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
