import type { Meta, StoryObj } from "@storybook/react";
import { Text } from './texto';

const meta: Meta<typeof Text> = {
  title: "Design System/Text",
  component: Text,
  argTypes: {
    variant: {
      control: "select",
      options: ["title", "subtitle", "body", "caption"],
    },
    as: {
      control: "select",
      options: ["h1", "h2", "p", "span"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Title: Story = {
  args: {
    variant: "title",
    as: "h1",
    children: "Título principal",
    className: ""
  },
};

export const Subtitle: Story = {
  args: {
    variant: "subtitle",
    as: "h2",
    children: "Subtítulo",
  },
};

export const Body: Story = {
  args: {
    variant: "body",
    as: "span",
    children: "Texto de cuerpo normal",
  },
};

export const Caption: Story = {
  args: {
    variant: "caption",
    as: "span",
    children: "Texto auxiliar",
  },
};
