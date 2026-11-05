import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
} from "react";

export type TextVariant =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body-lg"
  | "body-md"
  | "body-sm"
  | "caption"
  | "overline";

export type TextWeight = "regular" | "medium" | "semibold" | "bold";

export type TextColor =
  | "default"
  | "secondary"
  | "muted"
  | "success"
  | "warning"
  | "danger"
  | "brand"
  | "inverse";

export type TextAlign = "left" | "center" | "right" | "justify";

export type TextDefaultElement = "h1" | "h2" | "h3" | "h4" | "p" | "span";

export interface TextOwnProps {
  as?: ElementType;
  variant?: TextVariant;
  size?: TextVariant;
  weight?: TextWeight;
  color?: TextColor;
  align?: TextAlign;
  truncate?: boolean;
  italic?: boolean;
  uppercase?: boolean;
  noWrap?: boolean;
  className?: string;
}

export type TextProps<T extends ElementType = "p"> = Omit<
  TextOwnProps,
  "as"
> & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof TextOwnProps | "as"> & {
    ref?: ComponentPropsWithRef<T>["ref"];
  };
