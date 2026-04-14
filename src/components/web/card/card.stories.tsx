import type { Meta, StoryObj } from "@storybook/react";

import {
  CardNerux,
  CardHeaderNerux,
  CardFooterNerux,
  CardTitleNerux,
  CardDescriptionNerux,
  CardContentNerux,
} from "./index";

const meta: Meta<typeof CardNerux> = {
  title: "Design System/Card",
  component: CardNerux,
} satisfies Meta<typeof CardNerux>;

export default meta;

type Story = StoryObj<typeof CardNerux>;

export const Default: Story = {
  render: () => (
    <CardNerux>
      <CardHeaderNerux>
        <CardTitleNerux>Titulo de la Card</CardTitleNerux>
        <CardDescriptionNerux>Descripcion del Header de la Card</CardDescriptionNerux>
      </CardHeaderNerux>
      <CardContentNerux>Contenido de la card</CardContentNerux>
      <CardFooterNerux>Card Footer</CardFooterNerux>
    </CardNerux>
  ),
};
