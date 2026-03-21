import type { Meta, StoryObj } from "@storybook/react";
import { TextNerux } from './texto';

const meta: Meta<typeof TextNerux> = {
  title: "Design System/Text",
  component: TextNerux,
  argTypes: {
    variant: {
      control: "select",
      options: ["title", "subtitle", "body", "caption", "error"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextNerux>;

export const Title: Story = {
  args: {
    variant: "title",
    children: "Título principal",
  },
};

export const Subtitle: Story = {
  args: {
    variant: "subtitle",
    children: "Subtítulo",
  },
};

export const Body: Story = {
  args: {
    variant: "body",
    children: "Texto de cuerpo normal",
  },
};

export const Caption: Story = {
  args: {
    variant: "caption",
    children: "Texto auxiliar",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    children: "Mensaje de error",
  },
};

export const mixStyles: Story = {
  args: {
    as: "span",
    variant: "subtitle",
    children: "Texto en cursiva",
    italic: true,
  },
};
