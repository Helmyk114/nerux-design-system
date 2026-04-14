import { Drawer } from "@heroui/react";
import type { ComponentProps } from "react";

export function DrawerHeaderNerux({
  children,
  ...prop
}: ComponentProps<typeof Drawer.Header>) {
  return <Drawer.Header {...prop}>{children}</Drawer.Header>;
}
