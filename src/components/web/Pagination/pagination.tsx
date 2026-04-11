import { Pagination } from "@heroui/react";
import { useMemo } from "react";
import type { PaginationNeruxProps } from "./pagination.types";

export function PaginationNerux({
  currentPage,
  totalItems,
  totalPages,
  perPage,
  onChange,
  table,
}: PaginationNeruxProps) {
  const { startItem, endItem } = useMemo(() => {
    if (totalItems === 0) return { startItem: 0, endItem: 0 };

    const startItem = (currentPage - 1) * perPage + 1;
    const endItem = Math.min(currentPage * perPage, totalItems);

    return { startItem, endItem };
  }, [currentPage, perPage, totalItems]);

  const getPagesNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis")[] = [1];

    if (currentPage > 3) pages.push("ellipsis");

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("ellipsis");

    pages.push(totalPages);
    return pages;
  };
  
  return (
    <Pagination>
      <Pagination.Summary>
        {startItem}-{endItem} de {totalItems} {table}
      </Pagination.Summary>

      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous
            isDisabled={currentPage === 1}
            onPress={() => onChange(currentPage - 1)}
          >
            <Pagination.PreviousIcon />
          </Pagination.Previous>
        </Pagination.Item>

        {getPagesNumbers().map((p, i) =>
          p === "ellipsis" ? (
            <Pagination.Item key={`ellipsis-${i}`}>
              <Pagination.Ellipsis />
            </Pagination.Item>
          ) : (
            <Pagination.Item key={p}>
              <Pagination.Link
                isActive={p === currentPage}
                onPress={() => onChange(p)}
              >
                {p}
              </Pagination.Link>
            </Pagination.Item>
          ),
        )}

        <Pagination.Item>
          <Pagination.Next
            isDisabled={currentPage === totalPages || totalPages === 0}
            onPress={() => onChange(currentPage + 1)}
          >
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}
