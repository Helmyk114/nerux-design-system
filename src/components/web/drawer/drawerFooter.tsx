import { Drawer } from "@heroui/react";
import type { ComponentProps } from "react";

export function DrawerFooterNerux({
  children,
  ...prop
}: ComponentProps<typeof Drawer.Header>) {
  return <Drawer.Footer {...prop}>{children}</Drawer.Footer>;
}
