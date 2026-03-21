import { ModalHeader, type ModalProps as HeroModalProps } from "@heroui/react";

export function ModalHeaderNerux({ children, ...props }: HeroModalProps) {
  return <ModalHeader {...props}>{children}</ModalHeader>;
}
