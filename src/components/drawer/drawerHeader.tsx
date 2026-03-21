import {
  DrawerHeader,
  type DrawerProps as HeroDrawerProps,
} from "@heroui/react";

export function DrawerHeaderNerux({ children, ...prop }: HeroDrawerProps) {
  return <DrawerHeader {...prop}>{children}</DrawerHeader>;
}
