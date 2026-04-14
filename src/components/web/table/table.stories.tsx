import type { Meta, StoryObj } from "@storybook/react";
import { data, TableContentNerux, TableNerux, users } from "./index";

const meta: Meta = {
  title: "Design System/Table",
  component: TableNerux,
} satisfies Meta<typeof TableNerux>;

export default meta;

type Story = StoryObj<typeof TableNerux>;

export const Default: Story = {
  render: () => (
    <TableNerux>
      <TableContentNerux
        table="Prueba"
        columns={data}
        rowHeaderKey="id"
        data={users}
      />
    </TableNerux>
  ),
};
