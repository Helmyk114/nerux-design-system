import { Modal, type ModalProps as HeroModalProps } from "@heroui/react";

export function ModalNerux({ children, ...props }: HeroModalProps) {
  return (
    <Modal {...props}>
      <Modal.Backdrop variant="blur">
        <Modal.Container size="md">
          <Modal.Dialog>
            <Modal.CloseTrigger />
            {children}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
