// src/components/Select/select.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { states } from "./data.mock";
import { SelectNerux } from "./select";
import type { SelectProps } from "./select.type";

const meta: Meta<typeof SelectNerux> = {
  title: "Design System/Select",
  component: SelectNerux,
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "changed" },
    error: { control: "boolean" },
    required: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof SelectNerux>;

// 1. Historia Base (Default)
export const Default: Story = {
  args: {
    label: "Rol de Usuario",
    placeholder: "Selecciona un permiso",
    options: states,
  },
};

// 2. Historia Interactiva
const SelectInteractive = (args: SelectProps) => {
  const [val, setVal] = useState(args.value);

  return (
    <div className="max-w-xs">
      <SelectNerux
        {...args}
        value={val}
        onChange={(newVal) => setVal(newVal)}
      />
      <p className="mt-4 text-xs text-slate-500 font-mono">
        Valor seleccionado: {val ?? "null"}
      </p>
    </div>
  );
};

export const Interactive: Story = {
  render: (args) => <SelectInteractive {...args} />,
  args: {
    label: "Estado de Factura",
    options: states,
  },
};

// 3. Estado con Error (Validación)
export const WithError: Story = {
  args: {
    label: "País de origen",
    options: states,
    error: "Debes seleccionar un país para continuar.",
    required: true,
  },
};
