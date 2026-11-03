import type { ButtonVariant } from "./button.types";

const primary = [
  "[--button-bg:var(--nerux-color-primary-bg-default)]",
  "[--button-bg-hover:var(--nerux-color-primary-bg-hover)]",
  "[--button-bg-pressed:var(--nerux-color-primary-bg-active)]",
  "[--button-fg:var(--nerux-color-primary-foreground)]",
].join(" ");

const secondary = [
  "[--button-bg:color-mix(in_oklch,var(--nerux-color-secondary-bg-default)_80%,var(--nerux-color-text-default))]",
  "[--button-bg-hover:color-mix(in_oklch,var(--nerux-color-secondary-bg-default)_72%,var(--nerux-color-text-default))]",
  "[--button-bg-pressed:color-mix(in_oklch,var(--nerux-color-secondary-bg-default)_64%,var(--nerux-color-text-default))]",
  "[--button-fg:var(--nerux-color-secondary-text-default)]",
].join(" ");

const tertiary = [
  "[--button-bg:var(--nerux-color-surface-secondary)]",
  "[--button-bg-hover:var(--nerux-color-surface-hover)]",
  "[--button-bg-pressed:var(--nerux-color-surface-active)]",
  "[--button-fg:var(--nerux-color-text-default)]",
].join(" ");

const outline = [
  "[--button-bg:transparent]",
  "[--button-bg-hover:var(--nerux-color-surface-hover)]",
  "[--button-bg-pressed:var(--nerux-color-surface-active)]",
  "[--button-fg:var(--nerux-color-text-default)]",
  "[border-color:var(--nerux-color-border-default)]",
].join(" ");

const ghost = [
  "[--button-bg:transparent]",
  "[--button-bg-hover:var(--nerux-color-surface-hover)]",
  "[--button-bg-pressed:var(--nerux-color-surface-active)]",
  "[--button-fg:var(--nerux-color-text-default)]",
].join(" ");

const danger = [
  "[--button-bg:var(--nerux-color-danger)]",
  "[--button-bg-hover:color-mix(in_oklch,var(--nerux-color-danger)_88%,var(--nerux-color-text-default))]",
  "[--button-bg-pressed:color-mix(in_oklch,var(--nerux-color-danger)_78%,var(--nerux-color-text-default))]",
  "[--button-fg:var(--nerux-color-danger-foreground)]",
].join(" ");

const dangerSoft = [
  "[--button-bg:var(--nerux-color-danger-bg)]",
  "[--button-bg-hover:color-mix(in_oklch,var(--nerux-color-danger-bg)_88%,var(--nerux-color-text-default))]",
  "[--button-bg-pressed:color-mix(in_oklch,var(--nerux-color-danger-bg)_78%,var(--nerux-color-text-default))]",
  "[--button-fg:var(--nerux-color-danger-text)]",
].join(" ");

export const buttonColorVariants: Record<ButtonVariant, string> = {
  primary,
  secondary,
  tertiary,
  outline,
  ghost,
  danger,
  "danger-soft": dangerSoft,
};
