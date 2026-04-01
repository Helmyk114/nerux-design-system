import type { Meta, StoryObj } from "@storybook/react";
import { CheckBoxNerux } from "./checkBox";
import { useState } from "react";
import type { CheckBoxProps } from "./checkBox.type";

const meta: Meta<typeof CheckBoxNerux> = {
  title: "Design System/CheckBox",
  component: CheckBoxNerux,
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "changed" },
    value: { control: "boolean" },
    disable: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof CheckBoxNerux>;

export const Default: Story = {
  render: (args) => <CheckBoxInteractive {...args} />,
  args: {
    id: "terms",
    label: "Acepto los términos y condiciones",
    value: false,
  },
};

const CheckBoxInteractive = (args: CheckBoxProps) => {
  const [isSelected, setIsSelected] = useState(args.value);

  return (
    <div className="p-4">
      <CheckBoxNerux
        {...args}
        value={isSelected}
        onChange={(val) => setIsSelected(val)}
      />
      <p className="mt-2 text-xs text-gray-500">
        Estado: {isSelected ? "Seleccionado" : "No seleccionado"}
      </p>
    </div>
  );
};

export const Interactive: Story = {
  render: (args) => <CheckBoxInteractive {...args} />,
  args: {
    id: "interactive-check",
    label: "Activar notificaciones",
    description: "Recibirás correos sobre actualizaciones del ERP.",
    value: false,
  },
};

export const WithDescription: Story = {
  render: (args) => <CheckBoxInteractive {...args} />,
  args: {
    id: "admin-perm",
    label: "Acceso de Super Administrador",
    description: "Atención: Esto permite borrar registros de cualquier tenant.",
    value: true,
  },
};

export const WithError: Story = {
  render: (args) => <CheckBoxInteractive {...args} />,
  args: {
    id: "error-check",
    label: "Confirmar borrado masivo",
    error: "Debes marcar esta casilla para proceder",
    value: false,
  },
};

export const Disabled: Story = {
  render: (args) => <CheckBoxInteractive {...args} />,
  args: {
    id: "disabled-check",
    label: "Opción no disponible",
    description: "Tu plan actual no permite esta configuración.",
    disable: true,
    value: false,
  },
};
