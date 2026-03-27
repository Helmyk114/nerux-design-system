import type { Meta, StoryObj } from "@storybook/react";
import { TableHeaderNerux, TableNerux } from "./index";

const meta: Meta = {
   title: "Design System/Table",
   component: TableNerux
} satisfies Meta<typeof TableNerux>;

export default meta;

type Story = StoryObj<typeof TableNerux>;

const data = [
  { name: "Nombre", id: "name"},
  { name: "Descripción", id: "description" },
  { name: "Estado", id: "estado"},
  { name: "Correo", id: "correo"}
]

export const Default: Story = {
  render: () => (
    <TableNerux>
      <TableHeaderNerux columns={data} rowHeaderKey="Nombre"></TableHeaderNerux>
    </TableNerux>
  )
}