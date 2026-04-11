import type { TableProps as HeroTableProps } from "@heroui/react";

export interface TableProps extends HeroTableProps {
  footer?: React.ReactNode;
}

export interface TableContentProps<T> {
  table: string;
  columns: Column[];
  rowHeaderKey: keyof T;
  data: T[];
  renderCell?: ColumnRenderCell<T>;
}

interface Column {
  id: string | number;
  name: string;
}

type ColumnRenderCell<T> = {
  [key: string]: (item: T) => React.ReactNode;
};
