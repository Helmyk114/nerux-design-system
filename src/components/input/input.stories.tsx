import type { Meta, StoryObj } from "@storybook/react";
import { InputNerux } from "./input";

const meta: Meta<typeof InputNerux> = {
  title: "Design System/Input",
  component: InputNerux,
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number"],
    },
    disabled: {
      control: "boolean",
    },
    required: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputNerux>;

export const Error: Story = {
  args: {
    label: "Email",
    disabled: false,
    required: true,
    placeholder: "Ingrese su email",
    error: "Correo incorrecto"
  }
}

export const Default: Story = {
  args: {
    label: "Email",
    disabled: false,
    required: true,
    placeholder: "Ingrese su email",
  }
}

export const Disabled: Story = {
  args: {
    label: "Email",
    disabled: true,
    required: true,
    placeholder: "Ingrese su email",
  }
}