import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconNerux } from "../icons/icon";
import { InputNerux } from "./input";
import type { InputSize, InputVariant } from "./input.types";

const meta: Meta<typeof InputNerux> = {
  title: "Design System/Input",
  component: InputNerux,
  args: {
    variant: "primary",
    size: "md",
    label: "Correo electrónico",
    placeholder: "tu@ejemplo.com",
    type: "email",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    label: { control: "text" },
    description: { control: "text" },
    errorMessage: { control: "text" },
    startContent: { control: false },
    endContent: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof InputNerux>;

const variants: InputVariant[] = ["primary", "secondary"];
const sizes: InputSize[] = ["sm", "md", "lg"];

export const Default: Story = {};

export const VariantsAndSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-wrap items-start gap-4">
          {sizes.map((size) => (
            <InputNerux
              key={size}
              {...args}
              variant={variant}
              size={size}
              label={`${variant} · ${size}`}
            />
          ))}
        </div>
      ))}
    </div>
  ),
};

export const LabelAndDescription: Story = {
  args: {
    label: "Nombre completo",
    description: "Tal como aparece en tu documento de identidad.",
    placeholder: "Ada Lovelace",
    type: "text",
  },
};

export const WithError: Story = {
  args: {
    label: "Correo electrónico",
    defaultValue: "ada@",
    description: "Usaremos este correo para avisos de tu cuenta.",
    errorMessage: "Introduce un correo electrónico válido.",
  },
};

export const InvalidWithoutMessage: Story = {
  args: {
    label: "Usuario",
    defaultValue: "ada lovelace",
    isInvalid: true,
    description: "Solo letras, números y guiones bajos.",
  },
};

export const WithSlots: Story = {
  args: {
    label: "Sitio web",
    placeholder: "nerux.design",
    startContent: <IconNerux name="IconWorld" size="sm" color="primary" />,
    endContent: <IconNerux name="IconCheck" size="sm" color="success" />,
    type: "url",
  },
};

export const Password: Story = {
  args: {
    label: "Contraseña",
    placeholder: "Mínimo 8 caracteres",
    type: "password",
    autoComplete: "current-password",
  },
};

export const Required: Story = {
  args: {
    label: "Correo electrónico",
    isRequired: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Correo electrónico",
    defaultValue: "ada@nerux.design",
    isDisabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    label: "Identificador",
    defaultValue: "usr_8f21c",
    isReadOnly: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: "Descripción del proyecto",
    placeholder: "Cuéntanos qué quieres construir",
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
};

export const WithoutLabel: Story = {
  args: {
    label: undefined,
    placeholder: "Buscar",
    type: "search",
    "aria-label": "Buscar",
    startContent: <IconNerux name="IconSearch" size="sm" color="primary" />,
  },
};
