import type { Meta, StoryObj } from "@storybook/react";

import {
  DrawerNerux,
  DrawerHeaderNerux,
  DrawerBodyNerux,
  DrawerFooterNerux,
} from "./index";

const meta: Meta<typeof DrawerNerux> = {
  title: "Design System/Drawer",
  component: DrawerNerux,
} satisfies Meta<typeof DrawerNerux>;

export default meta;

type Story = StoryObj<typeof DrawerNerux>;

export const Default: Story = {
  render: () => (
    <DrawerNerux isOpen={true}>
      <DrawerHeaderNerux>Drawer Header</DrawerHeaderNerux>
      <DrawerBodyNerux>Drawer Body</DrawerBodyNerux>
      <DrawerFooterNerux>Drawer Footer</DrawerFooterNerux>
    </DrawerNerux>
  ),
};
