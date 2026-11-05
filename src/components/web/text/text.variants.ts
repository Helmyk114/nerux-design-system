import clsx from "clsx";
import type {
  TextAlign,
  TextColor,
  TextDefaultElement,
  TextVariant,
  TextWeight,
} from "./text.types";

export const textDefaultElement: Record<TextVariant, TextDefaultElement> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  "body-lg": "p",
  "body-md": "p",
  "body-sm": "p",
  caption: "span",
  overline: "span",
};

export const textDefaultWeight: Record<TextVariant, TextWeight> = {
  display: "bold",
  h1: "semibold",
  h2: "semibold",
  h3: "semibold",
  h4: "semibold",
  "body-lg": "regular",
  "body-md": "regular",
  "body-sm": "regular",
  caption: "regular",
  overline: "semibold",
};

const fontSize = (token: string) =>
  `[font-size:var(--nerux-font-size-${token})]`;
const fontFamily = (family: "heading" | "body") =>
  `[font-family:var(--nerux-font-family-${family})]`;
const lineHeight = (token: "tight" | "normal" | "relaxed") =>
  `[line-height:var(--nerux-line-height-${token})]`;

export const textVariantClasses: Record<TextVariant, string> = {
  display: clsx(
    fontSize("2xl"),
    fontFamily("heading"),
    lineHeight("tight"),
  ),
  h1: clsx(fontSize("title"), fontFamily("heading"), lineHeight("tight")),
  h2: clsx(fontSize("xl"), fontFamily("heading"), lineHeight("tight")),
  h3: clsx(fontSize("lg"), fontFamily("heading"), lineHeight("tight")),
  h4: clsx(fontSize("md"), fontFamily("heading"), lineHeight("normal")),
  "body-lg": clsx(
    fontSize("lg"),
    fontFamily("body"),
    lineHeight("relaxed"),
  ),
  "body-md": clsx(
    fontSize("body"),
    fontFamily("body"),
    lineHeight("normal"),
  ),
  "body-sm": clsx(fontSize("sm"), fontFamily("body"), lineHeight("normal")),
  caption: clsx(
    fontSize("caption"),
    fontFamily("body"),
    lineHeight("normal"),
  ),
  overline: clsx(
    fontSize("xs"),
    fontFamily("body"),
    lineHeight("normal"),
    "[text-transform:uppercase]",
  ),
};

export const textWeightClasses: Record<TextWeight, string> = {
  regular: "[font-weight:var(--nerux-font-weight-regular)]",
  medium: "[font-weight:var(--nerux-font-weight-medium)]",
  semibold: "[font-weight:var(--nerux-font-weight-semibold)]",
  bold: "[font-weight:var(--nerux-font-weight-bold)]",
};

export const textColorClasses: Record<TextColor, string> = {
  default: "[color:var(--nerux-color-text-default)]",
  secondary: "[color:var(--nerux-color-text-secondary)]",
  muted: "[color:var(--nerux-color-text-muted)]",
  success: "[color:var(--nerux-color-success-text)]",
  warning: "[color:var(--nerux-color-warning-text)]",
  danger: "[color:var(--nerux-color-danger-text)]",
  brand: "[color:var(--nerux-color-brand-text)]",
  inverse: "[color:var(--nerux-color-text-inverse)]",
};

export const textAlignClasses: Record<TextAlign, string> = {
  left: "[text-align:left]",
  center: "[text-align:center]",
  right: "[text-align:right]",
  justify: "[text-align:justify]",
};

type TextModifiers = {
  truncate?: boolean;
  noWrap?: boolean;
  italic?: boolean;
  uppercase?: boolean;
};

/**
 * `truncate` already emits `white-space: nowrap`, so `noWrap` is only
 * emitted on its own to keep a single declaration in the class list.
 */
export function textModifierClasses({
  truncate = false,
  noWrap = false,
  italic = false,
  uppercase = false,
}: TextModifiers): string {
  return clsx(
    truncate &&
      "[display:block] [overflow:hidden] [text-overflow:ellipsis] [white-space:nowrap]",
    !truncate && noWrap && "[white-space:nowrap]",
    italic && "[font-style:italic]",
    uppercase && "[text-transform:uppercase]",
  );
}
