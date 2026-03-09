import { Button as HeroButton } from "@heroui/react";
import type { ButtonProps } from "./button.types";
import clsx from "clsx";
import { buttonVariant } from "./button.varaint";

export function ButtonNerux({
  color = "primary",
  size = "md",
  startIcon,
  endIcon,
  type = "button",
  isDisabled,
  isLoading,
  children,
}: ButtonProps) {
  return (
    <HeroButton
      variant="solid"
      size={size}
      startContent={startIcon}
      endContent={endIcon}
      type={type}
      isDisabled={isDisabled}
      isLoading={isLoading}
      className={clsx(
        isDisabled ? buttonVariant.disabled : buttonVariant[color],
      )}
    >
      {children}
    </HeroButton>
  );
}
