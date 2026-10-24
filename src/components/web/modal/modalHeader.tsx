import { Modal } from "@heroui/react";
import type { ComponentProps } from "react";

export function ModalHeaderNerux({
  children,
  ...props
}: ComponentProps<typeof Modal.Header>) {
  return (
    <Modal.Header {...props}>
      <Modal.Heading>{children}</Modal.Heading>
    </Modal.Header>
  );
}
