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
    variant: "solid",
    loading: false,
    disabled: false,
    type: "button",
  },
};

export const Loading: Story = {
  args: {
    children: "Cargando",
    variant: "solid",
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Deshabilitado",
    variant: "solid",
    disabled: true,
    color: "disabled",
  },
};

export const Danger: Story = {
  args: {
    children: "Eliminar",
    variant: "solid",
    loading: false,
    disabled: false,
    type: "button",
    color: "danger",
  },
};

export const Neutral: Story = {
  args: {
    children: "Cancelar",
    variant: "solid",
    loading: false,
    disabled: false,
    type: "button",
    color: "neutral",
  },
};
