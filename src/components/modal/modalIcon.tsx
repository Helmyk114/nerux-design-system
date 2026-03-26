import { Modal } from "@heroui/react";
import type { ComponentProps } from "react";

export function ModalIconNerux({
  children,
  ...prop
}: ComponentProps<typeof Modal.Icon>) {
  return <Modal.Icon {...prop}>{children}</Modal.Icon>;
}
