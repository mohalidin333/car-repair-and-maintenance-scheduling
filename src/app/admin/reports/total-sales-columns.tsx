import { currencyFormatter } from "@/app/utils/currency-formatter";
import { dateFormatter } from "@/app/utils/date-formatter";
import { ColumnDef } from "@tanstack/react-table";

type TotalSales = {
  id: number;
  service: number;
  inventory: number;
  total: number;
  created_at: string;
};

export const TotalSalesColumns: ColumnDef<TotalSales>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "service",
    header: "Service",
    cell: ({ row }) => <div>{currencyFormatter(row.getValue("service"))}</div>,
  },
  {
    accessorKey: "inventory",
    header: "Inventory",
    cell: ({ row }) => (
      <div>{currencyFormatter(row.getValue("inventory"))}</div>
    ),
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => <div>{currencyFormatter(row.getValue("total"))}</div>,
  },
  {
    accessorKey: "created_at",
    header: "Date",
    filterFn: (row, _id, value: { from: Date; to: Date }) => {
      const rowDate = new Date(row.getValue("created_at"));

      if (!value?.from) return true;

      const from = new Date(value.from);
      const to = value?.to ? new Date(value.to) : from;

      const normalize = (d: Date) =>
        new Date(d.getFullYear(), d.getMonth(), d.getDate());

      const normalizedRowDate = normalize(rowDate);
      const normalizedFrom = normalize(from);
      const normalizedTo = normalize(to);

      return (
        normalizedRowDate >= normalizedFrom && normalizedRowDate <= normalizedTo
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      return <div>{dateFormatter(date)}</div>;
    },
  },
];
