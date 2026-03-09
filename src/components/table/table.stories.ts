import type { Meta, StoryObj } from "@storybook/react";
import { TableNerux } from "./table";
import type { Column } from "./table.types";


interface User {
  id: number;
  name: string;
  role: string;
}

const columns: Column<User>[] = [
  { key: "name", name: "Name" },
  { key: "role", name: "Role" },
];

const rows: User[] = [
  { id: 1, name: "Sergio", role: "Admin" },
  { id: 2, name: "Ana", role: "User" },
];

const meta: Meta<typeof TableNerux<User>> = {
  title: "Design System/Table",
  component: TableNerux<User>,
};

export default meta;

type Story = StoryObj<typeof TableNerux<User>>;

export const Default: Story = {
  args: {
    columns: columns,
    rows: rows,
    getRowKey: (item) => item.id,
    renderCell: (item, columnKey) => item[columnKey],
  },
};

export const Loading: Story = {
  args: {
    columns,
    rows: [],
    isLoading: true,
    getRowKey: (item) => item.id,
    renderCell: (item, columnKey) => item[columnKey],
  },
};

export const Empty: Story = {
  args: {
    columns,
    rows: [],
    error: "No hay datos",
    getRowKey: (item) => item.id,
    renderCell: (item, columnKey) => item[columnKey],
  },
};