import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconNerux } from "../icons/icon";
import { ButtonNerux } from "./button";
import type { ButtonVariant } from "./button.types";

const meta: Meta<typeof ButtonNerux> = {
  title: "Design System/Button",
  component: ButtonNerux,
  args: {
    children: "Guardar",
    variant: "primary",
    size: "md",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "outline",
        "ghost",
        "danger",
        "danger-soft",
      ],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonNerux>;

const variants: ButtonVariant[] = [
  "primary",
  "secondary",
  "tertiary",
  "outline",
  "ghost",
  "danger",
  "danger-soft",
];

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {variants.map((variant) => (
        <ButtonNerux key={variant} {...args} variant={variant}>
          {variant}
        </ButtonNerux>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <ButtonNerux {...args} size="sm">
        Small
      </ButtonNerux>
      <ButtonNerux {...args} size="md">
        Medium
      </ButtonNerux>
      <ButtonNerux {...args} size="lg">
        Large
      </ButtonNerux>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    children: "Guardando",
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Deshabilitado",
    isDisabled: true,
  },
};

export const WithSlots: Story = {
  args: {
    children: "Agregar elemento",
    startContent: <IconNerux name="IconPlus" size="sm" />,
    endContent: <IconNerux name="IconChevronRight" size="sm" />,
  },
};

export const FullWidth: Story = {
  args: {
    children: "Guardar cambios",
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const IconOnly: Story = {
  args: {
    isIconOnly: true,
    "aria-label": "Agregar elemento",
    children: <IconNerux name="IconPlus" />,
  },
};
