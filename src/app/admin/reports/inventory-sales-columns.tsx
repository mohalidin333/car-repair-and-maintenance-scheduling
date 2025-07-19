import { currencyFormatter } from "@/app/utils/currency-formatter";
import { dateFormatter } from "@/app/utils/date-formatter";
import { ColumnDef } from "@tanstack/react-table";

type InventorySale = {
  id: number;
  category: string;
  item_name: string;
  quantity: number;
  total_price: number;
  created_at: string;
};

export const InventorySalesColumns: ColumnDef<InventorySale>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "item_name",
    header: "Item Name",
    cell: ({ row }) => <div>{row.getValue("item_name")}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
  },
  {
    accessorKey: "total_price",
    header: "Total Price",
    cell: ({ row }) => (
      <div>{currencyFormatter(row.getValue("total_price"))}</div>
    ),
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
