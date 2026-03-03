import { Button as HeroButton } from "@heroui/react";
import type { ButtonProps } from "./button.types";
import clsx from "clsx";
import { buttonVariant } from "./button.varaint";

export function ButtonNerux({
  children,
  disabled = false,
  variant = "solid",
  color = "primary",
  size = "md",
  loading = false,
  startIcon,
  endIcon,
  type = "button",
  onPress,
}: ButtonProps) {
  return(
  <HeroButton
    disabled={disabled}
    variant={variant}
    size={size}
    isLoading={loading}
    startContent={startIcon}
    endContent={endIcon}
    type={type}
    onPress={onPress}
    className={clsx(buttonVariant[color])}
  >
    {children}
  </HeroButton> 
  );
}
