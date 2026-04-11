import type { ButtonColor } from "./button.types";

export const buttonVariant: Record<ButtonColor, string> = {
  primary: `bg-(--color-primary-bg-default) text-(--color-primary-text-default)`,
  neutral: `bg-(--color-neutral-bg-default) text-(--color-primary-text-default)`,
  disabled: `bg-(--color-disabled-bg-default) text-(--color-primary-text-disabled)`,
  danger: `bg-(--color-error) text-(--color-primary-text-default)`,
};
