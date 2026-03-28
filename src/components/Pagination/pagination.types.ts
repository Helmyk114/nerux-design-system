export interface PaginationNeruxProps {
  currentPage: number;   // Página actual (viene del Back)
  totalPages: number;    // Total de páginas (viene del Back)
  totalItems: number;    // Conteo total de registros (viene del Back)
  perPage: number;       // Registros por página (viene del Back)
  onChange: (page: number) => void; // Función para cambiar de página
  table: string;
}