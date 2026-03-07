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
    isDisabled: false,
    isRequired: true,
    placeholder: "Ingrese su email",
    error: "Correo incorrecto"
  }
}

export const Default: Story = {
  args: {
    label: "Email",
    isDisabled: false,
    isRequired: false,
    placeholder: "Ingrese su email",
  }
}

export const Disabled: Story = {
  args: {
    label: "Email",
    isDisabled: true,
    isRequired: true,
    placeholder: "Ingrese su email",
  }
}

export const Password: Story = {
  args: {
    label: "Contraseña",
    type: "password",
    placeholder: "Ingrese su contraseña",
  }
}