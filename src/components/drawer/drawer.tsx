import { Drawer } from "@heroui/react";
import type { DrawerProps as HeroDrawerProps } from "@heroui/react";

export function DrawerNerux({ children, ...props }: HeroDrawerProps) {
  return (
    <Drawer {...props}>
      <Drawer.Backdrop variant="blur">
        <Drawer.Content placement="right">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            {children}
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
