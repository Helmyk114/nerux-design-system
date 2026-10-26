import type { ComponentPropsWithRef, ReactNode } from "react";
import type { Button as HeroButton } from "@heroui/react";

type HeroButtonProps = ComponentPropsWithRef<typeof HeroButton>;

type LinkOnlyProps =
  | "href"
  | "target"
  | "rel"
  | "download"
  | "hrefLang"
  | "ping"
  | "referrerPolicy";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline"
  | "ghost"
  | "danger"
  | "danger-soft";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<
    HeroButtonProps,
    | "variant"
    | "size"
    | "children"
    | "isPending"
    | "color"
    | "render"
    | LinkOnlyProps
  > {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  children?: ReactNode;
}
