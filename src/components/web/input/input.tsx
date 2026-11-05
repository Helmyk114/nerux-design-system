import { useId, useState } from "react";
import type { JSX } from "react";
import {
  Button,
  Description,
  FieldError,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import clsx from "clsx";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import type { InputProps } from "./input.types";
import {
  inputFieldClasses,
  inputGroupClasses,
  inputSizeClasses,
  inputVariantClasses,
} from "./input.variants";

const LEGACY_INPUT_PROPS = ["error", "startIcon", "endIcon", "disabled"] as const;

function withoutLegacyProps(props: InputProps): InputProps {
  const sanitized = { ...props } as Record<string, unknown>;

  for (const key of LEGACY_INPUT_PROPS) {
    delete sanitized[key];
  }

  return sanitized as InputProps;
}

function hasContent(node: unknown): boolean {
  return node !== null && node !== undefined && node !== false && node !== "";
}

export function InputNerux(inputProps: InputProps): JSX.Element {
  const props = withoutLegacyProps(inputProps);

  const {
    variant = "primary",
    size = "md",
    label,
    description,
    errorMessage,
    startContent,
    endContent,
    className,
    ref,
    id,
    isInvalid: isInvalidProp,
    isDisabled,
    isReadOnly,
    isRequired,
    fullWidth,
    type = "text",
    value,
    defaultValue,
    onChange,
    placeholder,
    name,
    autoComplete,
    inputMode,
    pattern,
    maxLength,
    minLength,
    form,
    onKeyDown,
    onKeyUp,
    onFocus,
    onBlur,
    onInput,
    onBeforeInput,
    onCopy,
    onCut,
    onPaste,
    onCompositionStart,
    onCompositionEnd,
    onCompositionUpdate,
    onSelect,
    "aria-describedby": ariaDescribedBy,
    ...rest
  } = props;

  const generatedId = useId();
  const fieldId = id ?? generatedId;

  const hasLabel = hasContent(label);
  const hasDescription = hasContent(description);
  const hasError = Boolean(errorMessage);
  const hasPrefix = hasContent(startContent);
  const hasSuffix = hasContent(endContent) || type === "password";

  const isInvalid = isInvalidProp ?? (hasError ? true : undefined);

  const descriptionId = `${fieldId}-description`;
  const errorId = `${fieldId}-error`;

  const describedBy =
    [
      ariaDescribedBy,
      hasDescription ? descriptionId : null,
      hasError ? errorId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  const [isVisible, setIsVisible] = useState(false);
  const [lastType, setLastType] = useState(type);

  // Reset visibility when `type` changes away from password without an effect.
  if (lastType !== type) {
    setLastType(type);
    if (isVisible) {
      setIsVisible(false);
    }
  }

  const isPassword = type === "password";
  const resolvedType = isPassword && isVisible ? "text" : type;
  const iconPixels = size === "lg" ? 24 : 16;

  return (
    <TextField
      {...rest}
      value={value}
      defaultValue={defaultValue}
      isInvalid={isInvalid}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      fullWidth={fullWidth}
      className={clsx(
        inputVariantClasses[variant],
        inputSizeClasses[size],
        className,
      )}
    >
      {hasLabel ? (
        <Label
          htmlFor={fieldId}
          isRequired={isRequired}
          isInvalid={isInvalid}
        >
          {label}
        </Label>
      ) : null}

      <InputGroup
        className={inputGroupClasses}
        isInvalid={isInvalid}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
      >
        {hasPrefix ? (
          <InputGroup.Prefix>{startContent}</InputGroup.Prefix>
        ) : null}

        <InputGroup.Input
          ref={ref}
          id={fieldId}
          className={inputFieldClasses}
          type={resolvedType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          autoComplete={autoComplete}
          inputMode={inputMode}
          pattern={pattern}
          maxLength={maxLength}
          minLength={minLength}
          form={form}
          aria-invalid={isInvalid || undefined}
          aria-describedby={describedBy}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onFocus={onFocus}
          onBlur={onBlur}
          onInput={onInput}
          onBeforeInput={onBeforeInput}
          onCopy={onCopy}
          onCut={onCut}
          onPaste={onPaste}
          onCompositionStart={onCompositionStart}
          onCompositionEnd={onCompositionEnd}
          onCompositionUpdate={onCompositionUpdate}
          onSelect={onSelect}
        />

        {hasSuffix ? (
          <InputGroup.Suffix>
            {endContent}
            {isPassword ? (
              <Button
                type="button"
                isIconOnly
                variant="ghost"
                size={size}
                isDisabled={isDisabled}
                aria-label={
                  isVisible ? "Ocultar contraseña" : "Mostrar contraseña"
                }
                aria-pressed={isVisible}
                aria-controls={fieldId}
                onPress={() => setIsVisible((visible) => !visible)}
              >
                {isVisible ? (
                  <IconEyeClosed
                    size={iconPixels}
                    stroke={1.5}
                    className="text-(--nerux-color-text-secondary)"
                  />
                ) : (
                  <IconEye
                    size={iconPixels}
                    stroke={1.5}
                    className="text-(--nerux-color-text-secondary)"
                  />
                )}
              </Button>
            ) : null}
          </InputGroup.Suffix>
        ) : null}
      </InputGroup>

      {hasDescription ? (
        <Description id={descriptionId}>{description}</Description>
      ) : null}

      {hasError ? <FieldError id={errorId}>{errorMessage}</FieldError> : null}
    </TextField>
  );
}
