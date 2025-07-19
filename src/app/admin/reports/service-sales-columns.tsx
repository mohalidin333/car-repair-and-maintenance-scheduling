import { currencyFormatter } from "@/app/utils/currency-formatter";
import { dateFormatter } from "@/app/utils/date-formatter";
import { ColumnDef } from "@tanstack/react-table";

type ServiceSale = {
  id: number;
  service_type: string;
  service_name: string;
  service_fee: number;
  created_at: string;
};

export const ServiceSalesColumns: ColumnDef<ServiceSale>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "service_type",
    header: "Service Type",
    cell: ({ row }) => <div>{row.getValue("service_type")}</div>,
  },
  {
    accessorKey: "service_name",
    header: "Service Name",
    cell: ({ row }) => <div>{row.getValue("service_name")}</div>,
  },
  {
    accessorKey: "service_fee",
    header: "Service Fee",
    cell: ({ row }) => (
      <div>{currencyFormatter(row.getValue("service_fee"))}</div>
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
