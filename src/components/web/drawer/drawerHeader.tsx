import { Drawer } from "@heroui/react";
import type { ComponentProps } from "react";

export function DrawerHeaderNerux({
  children,
  ...props
}: ComponentProps<typeof Drawer.Header>) {
  return (
    <Drawer.Header {...props}>
      <Drawer.Heading>{children}</Drawer.Heading>
    </Drawer.Header>
  );
}
