import type { Meta, StoryObj } from "@storybook/react";
import { ButtonNerux } from "./button";

const meta: Meta<typeof ButtonNerux> = {
  title: "Design System/Button",
  component: ButtonNerux,
};

export default meta;

type Story = StoryObj<typeof ButtonNerux>;

export const Primary: Story = {
  args: {
    children: "Guardar",
    isDisabled: false,
    type: "button",
  },
};

export const Loading: Story = {
  args: {
    children: "Cargando",
  },
};

export const Disabled: Story = {
  args: {
    children: "Deshabilitado",
    isDisabled: true,
    color: "disabled",
  },
};

export const Danger: Story = {
  args: {
    children: "Eliminar",
    isDisabled: false,
    type: "button",
    color: "danger",
  },
};

export const Neutral: Story = {
  args: {
    children: "Cancelar",
    isDisabled: false,
    type: "button",
    color: "neutral",
  },
};
