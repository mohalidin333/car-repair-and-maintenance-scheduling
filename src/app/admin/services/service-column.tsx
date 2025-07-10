"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pen, Trash2 } from "lucide-react";
import { ServiceType } from "./service-type";

interface ServiceColumnProps {
  handleEdit: (row: ServiceType) => void;
  handleDelete: (row: ServiceType) => void;
}

export const ServiceColumns = ({
  handleEdit,
  handleDelete,
}: ServiceColumnProps): ColumnDef<ServiceType>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "service_type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("service_type") as "Repair" | "Maintenance";
      const color =
        type === "Repair"
          ? "bg-red-100 text-red-800"
          : "bg-green-100 text-green-800";
      return <span className={`px-2 py-1 rounded-md ${color}`}>{type}</span>;
    },
  },
  {
    accessorKey: "service_name",
    header: "Service Name",
    cell: ({ row }) => <div>{row.getValue("service_name")}</div>,
  },
  {
    accessorKey: "service_fee",
    header: "Fee",
    cell: ({ row }) => {
      const fee = row.getValue("service_fee") as number;
      return <div>₱{fee.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="text-gray-700">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      return <div className="text-gray-500">{row.getValue("created_at")}</div>;
    },
  },
  {
    id: "actions",
    header: () => <div className="w-full text-right">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="justify-end flex items-center gap-2">
          <button
            onClick={() => handleEdit(row.original)}
            className="cursor-pointer bg-blue-300 text-blue-900 px-2 py-1 rounded-md"
          >
            <Pen size={15} />
          </button>
          <button
            onClick={() => handleDelete(row.original)}
            className="cursor-pointer bg-red-300 text-red-900 px-2 py-1 rounded-md"
          >
            <Trash2 size={15} />
          </button>
        </div>
      );
    },
  },
];
