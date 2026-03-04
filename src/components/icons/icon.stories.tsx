import type { Meta, StoryObj } from "@storybook/react";
import { IconNerux } from "./icon";

const meta: Meta<typeof IconNerux> = {
  title: "Desing System/Icon",
  component: IconNerux,
};

export default meta;

type Story = StoryObj<typeof IconNerux>;

export const Icon: Story = {
  args: {
    name: "IconCircleCheck",
    color: "default",
    size: "md",
    stroke: "regular",
  },
};
