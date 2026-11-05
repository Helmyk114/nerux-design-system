import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextNerux } from "./text";
import type { TextAlign, TextColor, TextVariant, TextWeight } from "./text.types";
import { textDefaultElement } from "./text.variants";

const variants: TextVariant[] = [
  "display",
  "h1",
  "h2",
  "h3",
  "h4",
  "body-lg",
  "body-md",
  "body-sm",
  "caption",
  "overline",
];

const weights: TextWeight[] = ["regular", "medium", "semibold", "bold"];

const colors: TextColor[] = [
  "default",
  "secondary",
  "muted",
  "success",
  "warning",
  "danger",
  "brand",
  "inverse",
];

const aligns: TextAlign[] = ["left", "center", "right", "justify"];

const meta: Meta<typeof TextNerux> = {
  title: "Design System/Text",
  component: TextNerux,
  args: {
    children: "La tipografía del Design System se construye sobre tokens Nerux.",
    variant: "body-md",
    color: "default",
  },
  argTypes: {
    variant: {
      control: "select",
      options: variants,
    },
    size: {
      control: "select",
      options: variants,
      description: "Alias de `variant`; `variant` tiene precedencia.",
    },
    weight: {
      control: "select",
      options: weights,
    },
    color: {
      control: "select",
      options: colors,
    },
    align: {
      control: "select",
      options: aligns,
    },
    truncate: { control: "boolean" },
    italic: { control: "boolean" },
    uppercase: { control: "boolean" },
    noWrap: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof TextNerux>;

export const Default: Story = {};

export const Scale: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col gap-1">
          <TextNerux variant="caption" color="muted">
            {variant} · tag por defecto: {textDefaultElement[variant]}
          </TextNerux>
          <TextNerux variant={variant}>
            La tipografía del Design System se construye sobre tokens Nerux.
          </TextNerux>
        </div>
      ))}
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {weights.map((weight) => (
        <TextNerux key={weight} variant="body-lg" weight={weight}>
          {weight} · La tipografía del Design System se construye sobre tokens
          Nerux.
        </TextNerux>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div
        className="flex flex-col gap-3 rounded-lg p-4"
        style={{ background: "var(--nerux-color-surface-secondary)" }}
      >
        {colors
          .filter((color) => color !== "inverse")
          .map((color) => (
            <TextNerux key={color} color={color} weight="medium">
              {color} · La tipografía del Design System se construye sobre
              tokens Nerux.
            </TextNerux>
          ))}
      </div>
      <div
        className="flex flex-col gap-3 rounded-lg p-4"
        style={{ background: "var(--nerux-color-text-default)" }}
      >
        <TextNerux color="inverse" weight="medium">
          inverse · La tipografía del Design System se construye sobre tokens
          Nerux.
        </TextNerux>
      </div>
    </div>
  ),
};

export const AlignAndModifiers: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        {aligns.map((align) => (
          <div key={align} className="w-80 rounded border p-3">
            <TextNerux align={align} variant="body-sm">
              {align} · Texto alineado dentro de un contenedor de ancho fijo.
            </TextNerux>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <TextNerux variant="caption" color="muted">
          truncate fuerza display: block para que la elipsis funcione.
        </TextNerux>
        <div className="w-56 rounded border p-3">
          <TextNerux truncate>
            Este texto es demasiado largo para el contenedor y se trunca con
            elipsis.
          </TextNerux>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <TextNerux italic>Texto en cursiva.</TextNerux>
        <TextNerux uppercase>Texto en mayúsculas.</TextNerux>
        <TextNerux noWrap>
          Texto sin saltos de línea y sin truncamiento.
        </TextNerux>
      </div>
    </div>
  ),
};

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Usa los controles para combinar variante, alias `size`, peso, color, alineación y modificadores. `truncate` fuerza `display: block`.",
      },
    },
  },
  render: (args) => <TextNerux {...args} />,
};
