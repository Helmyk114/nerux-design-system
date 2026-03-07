import type { Meta, StoryObj } from "@storybook/react";
import { ButtonNerux } from "./button";

const meta: Meta<typeof ButtonNerux> = {
  title: "Desing System/Button",
  component: ButtonNerux,
};

export default meta;

type Story = StoryObj<typeof ButtonNerux>;

export const Primary: Story = {
  args: {
    children: "Guardar",
    isLoading: false,
    isDisabled: false,
    type: "button",
  },
};

export const Loading: Story = {
  args: {
    children: "Cargando",
    isLoading: true,
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
    isLoading: false,
    isDisabled: false,
    type: "button",
    color: "danger",
  },
};

export const Neutral: Story = {
  args: {
    children: "Cancelar",
    isLoading: false,
    isDisabled: false,
    type: "button",
    color: "neutral",
  },
};
