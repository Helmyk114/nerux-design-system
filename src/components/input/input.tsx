import {
  TextField,
  Label,
  FieldError,
  InputGroup,
  Button,
} from "@heroui/react";
import type { InputProps } from "./input.type";
import { IconNerux } from "../icons/icon";
import { TextNerux } from "../texto";
import { useState } from "react";
import clsx from "clsx";

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
      <InputGroup>
        <InputGroup.Prefix>
          {startIcon && <IconNerux name={startIcon} size="sm" />}
        </InputGroup.Prefix>
        <InputGroup.Input
          placeholder={props.placeholder}
          className={clsx(
            "text-(--color-primary-text-default)!",
            "focus-within:border-(--color-primary-bg-default)!",
            "hover:border-(--color-primary-bg-default)!",
            "border-(--color-border-default)!",
            hasError ? "border-(--color-error)! text-(--color-error)!" : "",
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
          <div className="flex items-center gap-1">
            <IconNerux name="IconAlertTriangle" size="sm" color="error" />
            <TextNerux variant="error">{error}</TextNerux>
          </div>
        </FieldError>
      ) : null}
    </TextField>
  );
}
