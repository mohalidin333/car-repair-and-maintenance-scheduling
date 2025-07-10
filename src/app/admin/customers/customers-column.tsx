"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Printer } from "lucide-react";

interface CustomersColumnsProps {
  handleProcess: (rowId: number) => void;
  handleInvoice: (rowId: number) => void;
}

export type CustomerType = {
  id: number;
  firstname: string;
  lastname: string;
  contact: string;
  schedule: string;
  service_type: string;
  service_name: string;
  status: string;
};

export const CustomersColumns = ({
  handleProcess,
  handleInvoice,
}: CustomersColumnsProps): ColumnDef<CustomerType>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "schedule",
    header: "Schedule",
    cell: ({ row }) => <div>{row.getValue("schedule")}</div>,
  },
  {
    accessorFn: (row) => `${row.firstname} ${row.lastname}`,
    id: "fullname",
    header: "Full Name",
    cell: ({ row }) => {
      const { contact } = row.original;
      return (
        <div className="space-y-2">
          <div className="font-semibold">{row.getValue("fullname")}</div>
          <div className="text-muted-foreground">{contact}</div>
        </div>
      );
    },
  },

  {
    accessorKey: "service_type",
    header: "Service Type",
    cell: ({ row }) => {
      const type = row.getValue("service_type") as string;
      const colorClass =
        type === "Repair"
          ? "bg-red-100 text-red-700"
          : "bg-green-100 text-green-700";

      return (
        <span className={`ptext-sm px-2 py-1 rounded-md ${colorClass}`}>
          {type}
        </span>
      );
    },
  },
  {
    accessorKey: "service_name",
    header: "Service Name",
    cell: ({ row }) => <div>{row.getValue("service_name")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const colorMap: Record<string, string> = {
        Pending: "bg-yellow-100 text-yellow-800",
        Confirmed: "bg-blue-100 text-blue-800",
        "In Progress": "bg-orange-100 text-orange-800",
        Completed: "bg-green-100 text-green-800",
        Cancelled: "bg-red-100 text-red-800",
      };

      return (
        <span
          className={`text-sm px-2 py-1 rounded-md ${
            colorMap[status] || "bg-gray-100 text-gray-800"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("created_at")}</div>
    ),
  },
  {
    accessorKey: "actions",
    header: () => <div className="w-full text-right">Actions</div>,

    cell: ({ row }) => (
      <div className="justify-end flex items-center gap-2">
        <button
          onClick={() => handleProcess(row.original.id)}
          className="border hover:bg-blue-300 border-blue-300 text-blue-800 px-2 py-1 rounded-md cursor-pointer"
        >
          <Eye size={15} />
        </button>

        <button
          onClick={() => handleInvoice(row.original.id)}
          className="border hover:bg-green-300 border-green-300 text-green-800 px-2 py-1 rounded-md cursor-pointer"
        >
          <Printer size={15} />
        </button>
      </div>
    ),
  },
  {
    id: "search",
    accessorFn: () => "",
    cell: () => null,
    header: () => null,
    enableColumnFilter: true,
    filterFn: (row, _id, value) => {
      const fullName =
        `${row.original.firstname} ${row.original.lastname}`.toLowerCase();
      return fullName.includes(value.toLowerCase());
    },
    meta: { hidden: true },
  },
];
