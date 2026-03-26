import { Drawer } from "@heroui/react";
import type { ComponentProps } from "react";

export function DrawerBodyNerux({
  children,
  ...prop
}: ComponentProps<typeof Drawer.Header>) {
  return <Drawer.Body {...prop}>{children}</Drawer.Body>;
}
