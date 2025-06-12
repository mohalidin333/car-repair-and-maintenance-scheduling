import { ColumnFiltersState } from "@tanstack/react-table";
import { useState } from "react";

export function useFilters() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
  ]);
  const handleFilter = (id: string, value: string) => {
    setColumnFilters((prev) => {
      const filters = prev.filter((e) => e.id !== id);
      filters.push({ id: id, value: value });
      return filters;
    });
  };

  return { handleFilter, columnFilters, setColumnFilters };
}
