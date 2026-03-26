import { Modal } from "@heroui/react";
import type { ComponentProps } from "react";

export function ModalFooterNerux({
  children,
  ...props
}: ComponentProps<typeof Modal.Header>) {
  return <Modal.Footer {...props}>{children}</Modal.Footer>;
}
