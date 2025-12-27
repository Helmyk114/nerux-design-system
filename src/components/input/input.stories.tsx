import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "Design System/Input",
  component: Input,
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

type Story = StoryObj<typeof Input>;

export const Disable: Story = {
  args: {
    label: "Email",
    disabled: false,
    required: true,
    placeholder: "Ingrese su email",
    error: "Correo incorrecto"
  }
}