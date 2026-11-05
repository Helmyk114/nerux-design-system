import type { InputSize, InputVariant } from "./input.types";

/**
 * HeroUI resolves `@theme inline` utilities against these local variables.
 * Feeding them from `--nerux-*` keeps hover, focus, invalid and shadow states
 * inside HeroUI's state machine while sourcing every value from the DS.
 */
const shadowToken = "var(--nerux-shadow-sm)";
const noShadow = "none";

const primary = [
  "[--danger:var(--nerux-color-danger-text)]",
  "[--field-background:var(--nerux-color-surface-default)]",
  "[--field-hover:var(--nerux-color-surface-hover)]",
  "[--field-foreground:var(--nerux-color-text-default)]",
  "[--field-placeholder:var(--nerux-color-text-secondary)]",
  "[--field-border:var(--nerux-color-border-default)]",
  "[--field-border-hover:var(--nerux-color-border-hover)]",
  "[--field-border-focus:var(--nerux-color-border-focus)]",
  "[--field-focus:var(--nerux-color-surface-default)]",
  `[--field-shadow:${shadowToken}]`,
].join(" ");

const secondary = [
  "[--danger:var(--nerux-color-danger-text)]",
  "[--field-background:var(--nerux-color-surface-secondary)]",
  "[--field-hover:var(--nerux-color-surface-hover)]",
  "[--field-foreground:var(--nerux-color-text-default)]",
  "[--field-placeholder:var(--nerux-color-text-secondary)]",
  "[--field-border:var(--nerux-color-border-default)]",
  "[--field-border-hover:var(--nerux-color-border-hover)]",
  "[--field-border-focus:var(--nerux-color-border-focus)]",
  "[--field-focus:var(--nerux-color-surface-secondary)]",
  `[--field-shadow:${noShadow}]`,
  "[--input-group-bg:var(--nerux-color-surface-secondary)]",
  "[--input-group-bg-hover:var(--nerux-color-surface-hover)]",
  "[--input-group-bg-focus:var(--nerux-color-surface-secondary)]",
].join(" ");

export const inputVariantClasses: Record<InputVariant, string> = {
  primary,
  secondary,
};

const sm = [
  "[--nerux-input-height:var(--nerux-spacing-8)]",
  "[--nerux-input-font:var(--nerux-font-size-sm)]",
].join(" ");

const md = [
  "[--nerux-input-height:var(--nerux-spacing-9)]",
  "[--nerux-input-font:var(--nerux-font-size-md)]",
].join(" ");

const lg = [
  "[--nerux-input-height:var(--nerux-spacing-10)]",
  "[--nerux-input-font:var(--nerux-font-size-lg)]",
].join(" ");

export const inputSizeClasses: Record<InputSize, string> = {
  sm,
  md,
  lg,
};

/**
 * Local HeroUI variables the group needs regardless of variant. The theme
 * leaves `--border-width-field` at 0px and does not define
 * `--color-field-border-invalid`, so both are declared here from DS tokens.
 */
export const inputGroupClasses = [
  "[--border-width-field:var(--nerux-border-width-default)]",
  "[--color-field-border-invalid:var(--nerux-color-danger)]",
  "[--danger:var(--nerux-color-danger)]",
  "[min-height:var(--nerux-input-height)]",
].join(" ");

export const inputFieldClasses = "[font-size:var(--nerux-input-font)]";
