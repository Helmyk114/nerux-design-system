import {
  TextField,
  Label,
  FieldError,
  InputGroup,
  Button,
  cn,
} from "@heroui/react";
import type { InputProps } from "./input.type";
import { IconNerux } from "../icons/icon";
import { TextNerux } from "../texto";
import { useState } from "react";

export function InputNerux({
  type = "text",
  error,
  startIcon,
  endIcon,
  ...props
}: InputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const hasError = Boolean(error);

  const inputType =
    type === "password" ? (isVisible ? "text" : "password") : type;

  return (
      <TextField
        type={inputType}
        isInvalid={hasError}
        name={props.name}
        isRequired={props.required}
        isDisabled={props.disabled}
      >
        <Label>{props.name}</Label>
        <InputGroup
          className={cn(
            "border",
            "[border-width:var(--border-width-thin)]",
            "[border-radius:var(--border-radius-lg)]",
            "border-solid",
            "border-(--color-border-default)",
            "focus-within:border-(--color-primary-bg-default)",
            "hover:border-(--color-primary-bg-default)",
            hasError
              ? "border-(--color-error) hover:border-(--color-error)"
              : "",
          )}
        >
          <InputGroup.Prefix>
            {startIcon && <IconNerux name={startIcon} size="sm" />}
          </InputGroup.Prefix>
          <InputGroup.Input 
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            className={cn(
              "text-(--color-primary-text-default)",
              hasError
                ? "text-(--color-error)"
                : "text-(--color-primary-text-default)",
            )}
          />
          <InputGroup.Suffix>
            {type === "password" ? (
              <Button
                isIconOnly
                variant="ghost"
                size="md"
                aria-label={isVisible ? "Hide password" : "Show password"}
                onPress={() => setIsVisible(!isVisible)}
              >
                {isVisible ? (
                  <IconNerux name="IconEyeClosed" />
                ) : (
                  <IconNerux name="IconEye" />
                )}
              </Button>
            ) : (
              endIcon && <IconNerux name={endIcon} />
            )}
          </InputGroup.Suffix>
        </InputGroup>

        {hasError ? (
          <FieldError>
            <div className="flex items-center gap-[var(--spacing-1)]">
              <IconNerux name="IconAlertTriangle" size="sm" color="error" />
              <TextNerux variant="error">{error}</TextNerux>
            </div>
          </FieldError>
        ) : null}
      </TextField>
  );
}
