import { ModalBody, type ModalProps as HeroModalProps } from "@heroui/react";

export function ModalBodyNerux({ children, ...props }: HeroModalProps) {
  return <ModalBody {...props}>{children}</ModalBody>;
}
