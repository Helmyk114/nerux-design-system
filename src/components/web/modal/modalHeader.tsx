import { Modal } from "@heroui/react";
import type { ComponentProps } from "react";

export function ModalHeaderNerux({
  children,
  ...props
}: ComponentProps<typeof Modal.Header>) {
  return <Modal.Header {...props}>{children}</Modal.Header>;
}
