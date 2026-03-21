import { Drawer, DrawerContent } from "@heroui/react";
import type { DrawerProps as HeroDrawerProps } from "@heroui/react";

export function DrawerNerux({ children, ...props }: HeroDrawerProps) {
  return (
    <Drawer
      {...props}
      backdrop="blur"
      classNames={{
        base: "bg-(--color-surface-default) text-(color:--color-primary-text-default)",
        header:
          "border-b-[1px] border-(--color-neutral-bg-default) w-[90%] mx-auto",
        footer:
          "border-t-[1px] border-(--color-neutral-bg-default) w-[90%] mx-auto",
      }}
    >
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
}
