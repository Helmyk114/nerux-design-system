import type { Meta, StoryObj } from "@storybook/react";
import { PaginationNerux } from "./pagination";
import { useState } from "react";
import type { PaginationNeruxProps } from "./pagination.types";

const meta: Meta<typeof PaginationNerux> = {
  title: "Design System/Pagination",
  component: PaginationNerux,
  argTypes: {
    currentPage: { control: { type: "number" }, description: "Página actual" },
    totalPages: {
      control: { type: "number" },
      description: "Total de páginas calculadas",
    },
    totalItems: {
      control: { type: "number" },
      description: "Total de registros en BD",
    },
    perPage: {
      control: { type: "number" },
      description: "Registros por bloque",
    },
    table: {
      control: { type: "text" },
      description: "Nombre de la entidad (ej: Categorías)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PaginationNerux>;

// 1. Estado Base
export const Default: Story = {
  render: (args) => <PaginadorInteractivo {...args} />,
  args: {
    currentPage: 1,
    totalPages: 10,
    totalItems: 100,
    perPage: 10,
    table: "Registros",
    onChange: (page) => console.log("Ir a página:", page),
  },
};

const PaginadorInteractivo = (args: PaginationNeruxProps) => {
  const [page, setPage] = useState(args.currentPage);

  return (
    <div className="p-4 border rounded-lg">
      <PaginationNerux
        {...args}
        currentPage={page}
        onChange={(newPage) => {
          setPage(newPage);
          args.onChange(newPage);
        }}
      />
    </div>
  );
};

// 2. Historia Interactiva (Para probar clics en Storybook)
export const Interactive: Story = {
  render: (args) => <PaginadorInteractivo {...args} />,
  args: {
    currentPage: 1,
    totalPages: 15,
    totalItems: 150,
    perPage: 10,
    table: "Usuarios",
  },
};

// 3. Estado Vacío
export const Empty: Story = {
  render: (args) => <PaginadorInteractivo {...args} />,
  args: {
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    perPage: 10,
    table: "Productos",
  },
};

// 4. Con muchas páginas (Prueba de Elipsis)
export const ManyPages: Story = {
  render: (args) => <PaginadorInteractivo {...args} />,
  args: {
    currentPage: 50,
    totalPages: 100,
    totalItems: 1000,
    perPage: 10,
    table: "Facturas",
  },
};
