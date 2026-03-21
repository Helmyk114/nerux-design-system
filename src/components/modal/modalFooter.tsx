import { ModalFooter, type ModalProps as HeroModalProps } from "@heroui/react";

export function ModalFooterNerux({ children, ...props }: HeroModalProps) {
  return <ModalFooter {...props}>{children}</ModalFooter>;
}
