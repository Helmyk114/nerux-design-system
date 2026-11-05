import type {
  ChangeEventHandler,
  ComponentPropsWithRef,
  ReactNode,
  Ref,
} from "react";
import { TextField as HeroTextField } from "@heroui/react";

type HeroTextFieldProps = ComponentPropsWithRef<typeof HeroTextField>;

export type InputVariant = "primary" | "secondary";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<
    HeroTextFieldProps,
    | "variant"
    | "children"
    | "className"
    | "ref"
    | "size"
    | "onChange"
    | "placeholder"
    | "disabled"
  > {
  variant?: InputVariant;
  size?: InputSize;
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  startContent?: ReactNode;
  endContent?: ReactNode;
  className?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  ref?: Ref<HTMLInputElement>;
  disabled?: never;
}
