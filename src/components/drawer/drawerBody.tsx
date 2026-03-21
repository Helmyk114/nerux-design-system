import {
  DrawerBody,
  type DrawerProps as HeroDrawerProps,
} from "@heroui/react";

export function DrawerBodyNerux({ children, ...prop }: HeroDrawerProps) {
  return <DrawerBody {...prop}>{children}</DrawerBody>;
}
