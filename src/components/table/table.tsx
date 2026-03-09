import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import type { TableProps } from "./table.types";

export function TableNerux<T>({
  columns,
  rows,
  getRowKey,
  renderCell,
  isLoading,
  error,
}: TableProps<T>) {
  return (
    <Table
      topContentPlacement="outside"
      bottomContentPlacement="outside"
      selectionMode="multiple"
      checkboxesProps={{
        classNames: {
          wrapper: "after:bg-(--color-primary-bg-default)",
        },
      }}
      classNames={{
        wrapper: "bg-(--color-surface-default)",
        th: "bg-(--surface-table-header) !font-[var(--font-weight-bold)] text-[var(--color-primary-text-default)] text-[length:var(--font-size-subtitle)]",
        tbody:
          "text-[var(--color-primary-text-default)] text-[length:var(--font-size-body)] font-[var(--font-weight-regular)]",
      }}
    >
      <TableHeader columns={columns}>
        {(columns) => (
          <TableColumn
            key={String(columns.key)}
            align={columns.align}
            allowsSorting={columns.allowsSorting}
          >
            {columns.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={rows}
        isLoading={isLoading}
        loadingContent={"Cargando"}
        emptyContent={error && "No hay datos para mostrar."}
      >
        {(item) => (
          <TableRow key={getRowKey(item)}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey as keyof T)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
