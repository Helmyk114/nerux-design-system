import type { TableProps as HeroTableProps } from "@heroui/react";

export interface Column<T> {
  key: keyof T;
  name: string;
  align?: "start" | "center" | "end";
  allowsSorting?: boolean;
}

export interface TableProps<T> extends HeroTableProps {
  columns: Column<T>[];
  rows: T[];
  getRowKey: (item: T) => string | number;
  renderCell: (item: T, columnKey: keyof T) => React.ReactNode;
  isLoading?: boolean;
  error?: string;
}