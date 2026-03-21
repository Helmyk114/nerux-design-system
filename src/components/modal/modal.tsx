import {
  Modal,
  ModalContent,
  type ModalProps as HeroModalProps,
} from "@heroui/react";

export function ModalNerux({ children, ...props }: HeroModalProps) {
  return (
    <Modal
      {...props}
      backdrop="blur"
      size="md"
      classNames={{
        header:
          "border-b-[1px] border-(--color-neutral-bg-default) w-[90%] mx-auto",
        base: "bg-(--color-surface-default) text-(color:--color-primary-text-default)",
      }}
    >
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
}
