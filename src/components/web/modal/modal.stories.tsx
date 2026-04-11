import type { Meta, StoryObj } from "@storybook/react";

import {
  ModalNerux,
  ModalHeaderNerux,
  ModalBodyNerux,
  ModalFooterNerux,
} from "./index";
import { ModalIconNerux } from "./modalIcon";
import { IconNerux } from "../icons/icon";

const meta: Meta = {
  title: "Design System/Modal",
  component: ModalNerux,
} satisfies Meta<typeof ModalNerux>;

export default meta;

type Story = StoryObj<typeof ModalNerux>;

export const Default: Story = {
  render: () => (
    <ModalNerux isOpen={true} >
      <ModalHeaderNerux >
        <ModalIconNerux className="flex "> 
          <IconNerux name="IconAlertTriangle" size="xl" color="error" /></ModalIconNerux>
          Modal Header
        </ModalHeaderNerux>
      <ModalBodyNerux>Modal Body</ModalBodyNerux>
      <ModalFooterNerux>Modal Footer</ModalFooterNerux>
    </ModalNerux>
  ),
};