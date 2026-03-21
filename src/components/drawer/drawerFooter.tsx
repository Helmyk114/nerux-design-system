import {
  DrawerFooter,
  type DrawerProps as HeroDrawerProps,
} from "@heroui/react";

export function DrawerFooterNerux({ children, ...prop }: HeroDrawerProps) {
  return <DrawerFooter {...prop}>{children}</DrawerFooter>;
}
