"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Ban, Pen, Printer } from "lucide-react";
import { AppointmentType } from "./appointment-type";

interface CustomersColumnsProps {
  handleEdit: (row: any) => void;
  handleCancel: (row: any) => void;
  handleView: (id: number, amount: number) => void;
  handleInvoice: (row: any) => void;
}

// export type CustomerType = {
//   id: number;
//   schedule: string;
//   service_type: string;
//   service_name: string;
//   total_fee: number;
//   status: string;
//   created_at: string;
//   is_paid: string;
// };

export const CustomersColumns = ({
  handleEdit,
  handleCancel,
  handleView,
  handleInvoice,
}: CustomersColumnsProps): ColumnDef<AppointmentType>[] => [
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
    accessorKey: "total_fee",
    header: "Total Fee",
    cell: ({ row }) => (
      <div>₱{Number(row.getValue("total_fee")).toLocaleString()}.00</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const colorMap: Record<string, string> = {
        Pending: "bg-yellow-100 text-yellow-800",
        Approved: "bg-green-100 text-green-800",
        Disapproved: "bg-gray-100 text-gray-800",
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
    id: "actions",
    header: () => <div className="w-full text-right">Actions</div>,

    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const isPaid = row.original.is_paid as string;

      if (status === "Pending") {
        return (
          <div className="justify-end flex items-center gap-2">
            <button
              onClick={() => handleEdit(row.original.id)}
              className="border hover:bg-blue-300 border-blue-300 text-blue-800 px-2 py-1 rounded-md cursor-pointer"
            >
              <Pen size={15} />
            </button>
            <button
              onClick={() => handleCancel(row.original.id)}
              className="border hover:bg-red-300 border-red-300 text-red-800 px-2 py-1 rounded-md cursor-pointer"
            >
              <Ban size={15} />
            </button>
          </div>
        );
      } else if (status !== "Disapproved" && status !== "Cancelled") {
        return (
          <div className="justify-end flex items-center gap-2">
            {isPaid !== "Paid" && (
              <button
                onClick={() =>
                  handleView(row.original.id, row.original.total_fee)
                }
                className="border hover:bg-blue-300 border-blue-300 text-blue-800 px-2 py-1 rounded-md cursor-pointer"
              >
                <p className="text-xs">Pay Gcash</p>
              </button>
            )}
            <button
              onClick={() => handleInvoice(row.original)}
              className="border hover:bg-green-300 border-green-300 text-green-800 px-2 py-1 rounded-md cursor-pointer"
            >
              <Printer size={15} />
            </button>
          </div>
        );
      }
    },
  },
];
