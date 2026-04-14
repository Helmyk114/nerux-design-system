import { Table } from "@heroui/react";
import type { TableProps } from "./table.types";

export function TableNerux({ children, footer, ...props }: TableProps) {
  return (
    <Table {...props}>
      <Table.ScrollContainer>{children}</Table.ScrollContainer>
      {footer && <Table.Footer>{footer}</Table.Footer>}
    </Table>
  );
}
