import { Modal } from "@heroui/react";
import type { ComponentProps } from "react";

export function ModalBodyNerux({
  children,
  ...props
}: ComponentProps<typeof Modal.Header>) {
  return <Modal.Body {...props}>{children}</Modal.Body>;
}
