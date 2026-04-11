import { Button } from '@heroui/react';
import type { ButtonProps } from "./button.types";
import clsx from "clsx";
import { buttonVariant } from "./button.varaint";

export function ButtonNerux({
  color = "primary",
  size = "md",
  type = "button",
  isDisabled,
  isPending,
  children,
}: ButtonProps) {
  return (
    <Button
      variant="primary"
      size={size}
      type={type}
      isDisabled={isDisabled}
      isPending={isPending}
      className={clsx(
        isDisabled ? buttonVariant.disabled : buttonVariant[color],
      )}
    >
      {children}
    </Button>
  );
}
