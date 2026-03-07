import type { Meta, StoryObj } from "@storybook/react";

import {
  CardNerux,
  CardHeaderNerux,
  CardBodyNerux,
  CardFooterNerux,
} from "./index";

const meta: Meta<typeof CardNerux> = {
  title: "Desing System/Card",
  component: CardNerux,
} satisfies Meta<typeof CardNerux>;

export default meta;

type Story = StoryObj<typeof CardNerux>;

export const Default: Story = {
  render: () => (
    <CardNerux>
      <CardHeaderNerux>Card Header</CardHeaderNerux>
      <CardBodyNerux>Card Body</CardBodyNerux>
      <CardFooterNerux>Card Footer</CardFooterNerux>
    </CardNerux>
  ),
};
