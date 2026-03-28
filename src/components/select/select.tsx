import { cn, FieldError, Label, ListBox, Select } from "@heroui/react";
import { IconNerux } from "../icons/icon";
import { TextNerux } from "../texto";
import type { SelectProps } from "./select.type";

export function SelectNerux({
  value,
  onChange,
  options,
  label,
  error,
  ...props
}: SelectProps) {
  const hasError = Boolean(error);
  return (
    <Select
      placeholder={props.placeholder}
      value={value}
      onChange={onChange}
      isDisabled={props.disabled}
      isRequired={props.required}
      isInvalid={hasError}
    >
      <Label>{label}</Label>
      <Select.Trigger
        className={cn(
          "border-[0.2px] rounded-lg",
          "border-(--color-border-default)",
          "focus-within:border-(--color-primary-bg-default)",
          "hover:border-(--color-primary-bg-default)",
          hasError
            ? "border-(--color-error) hover:border-(--color-error) focus-within:border-(--color-error)"
            : "",
        )}
      >
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>

      <Select.Popover>
        <ListBox>
          {options.map((option) => (
            <ListBox.Item
              key={option.id}
              id={option.id}
              textValue={option.name}
            >
              {option.name}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
      {hasError ? (
        <FieldError>
          <div className="flex items-center gap-1">
            <IconNerux name="IconAlertTriangle" size="sm" color="error" />
            <TextNerux variant="error">{error}</TextNerux>
          </div>
        </FieldError>
      ) : null}
    </Select>
  );
}
