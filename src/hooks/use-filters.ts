import { ColumnFiltersState } from "@tanstack/react-table";
import { useState } from "react";

type Dates = { from: Date | undefined; to: Date | undefined };

export function useFilters() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const handleFilter = (id: string, value: string | Dates) => {
    setColumnFilters((prev) => {
      const filters = prev.filter((e) => e.id !== id);
      if (typeof value === "object") {
        filters.push({ id: id, value: { from: value.from!, to: value.to! } });
        return filters;
      }
      filters.push({ id: id, value: value });
      return filters;
    });
  };

  return { handleFilter, columnFilters, setColumnFilters };
}
