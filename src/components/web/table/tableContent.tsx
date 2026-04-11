import { Table } from "@heroui/react";
import type { TableContentProps } from "./table.types";

export function TableContentNerux<T extends { id: string | number }>({
  table,
  columns,
  rowHeaderKey,
  data,
  renderCell,
}: TableContentProps<T>) {
  return (
    <Table.Content aria-label={table}>
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column
            key={column.id}
            isRowHeader={column.id === rowHeaderKey}
          >
            {column.name}
          </Table.Column>
        )}
      </Table.Header>

      <Table.Body items={data}>
        {(item) => (
          <Table.Row key={item.id}>
            {columns.map((column) => (
              <Table.Cell>
                {renderCell && renderCell[column.id]
                  ? renderCell[column.id](item)
                  : (item[column.id as keyof T] as React.ReactNode)}
              </Table.Cell>
            ))}
          </Table.Row>
        )}
      </Table.Body>
    </Table.Content>
  );
}
