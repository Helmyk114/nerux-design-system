import { Checkbox, Description, Label } from "@heroui/react";
import type { CheckBoxProps } from "./checkBox.type";

export function CheckBoxNerux({
  id,
  label,
  description,
  value,
  onChange,
  disable,
  error,
}: CheckBoxProps) {
  const hasError = Boolean(error);
  return (
    <Checkbox
      id={id}
      isSelected={value}
      onChange={onChange}
      isDisabled={disable}
      isInvalid={hasError}
    >
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Content>
        <Label htmlFor={id}>{label}</Label>
        {description ? <Description>{description}</Description> : null}
      </Checkbox.Content>
    </Checkbox>
  );
}
