import type { Meta, StoryObj } from "@storybook/react";

import {
  ModalNerux,
  ModalHeaderNerux,
  ModalBodyNerux,
  ModalFooterNerux,
} from "./index";

const meta: Meta = {
  title: "Design System/Modal",
  component: ModalNerux,
} satisfies Meta<typeof ModalNerux>;

export default meta;

type Story = StoryObj<typeof ModalNerux>;

export const Default: Story = {
  render: () => (
    <ModalNerux isOpen={true}>
      <ModalHeaderNerux>Modal Header</ModalHeaderNerux>
      <ModalBodyNerux>Modal Body</ModalBodyNerux>
      <ModalFooterNerux>Modal Footer</ModalFooterNerux>
    </ModalNerux>
  ),
};