import { Table } from "@heroui/react";

interface Column {
  id: string | number;
  name: string;
}
interface props<T> {
  columns: Column[];
  rowHeaderKey: keyof T;
}

export function TableHeaderNerux<T>({ columns, rowHeaderKey }: props<T>) {
  return (
    <Table.Header columns={columns}>
      {(column) => (
        <Table.Column key={column.id} isRowHeader={column.id === rowHeaderKey}>
          {column.name}
        </Table.Column>
      )}
    </Table.Header>
  );
}
