import type { Meta, StoryObj } from "@storybook/react";
import { TextNerux } from "./index";

const meta: Meta<typeof TextNerux> = {
  title: "Design System/Text",
  component: TextNerux,
} satisfies Meta<typeof TextNerux>;

export default meta;

type Story = StoryObj<typeof TextNerux>;

export const Default: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-6">
      <TextNerux variant="title">{"Soy un Titulo"}</TextNerux>
      <TextNerux variant="subtitle">{"Soy un Subtitulo"}</TextNerux>
      <TextNerux variant="body">{"Soy un texto normal"}</TextNerux>
      <TextNerux variant="caption">{"Soy un texto auxiliar"}</TextNerux>
      <TextNerux variant="error">{"Soy un error"}</TextNerux>
    </div>
  ),
};
