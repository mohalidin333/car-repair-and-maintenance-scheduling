"use client";

import { ColumnDef } from "@tanstack/react-table";
import { InventoryType } from "./inventory-type";
import { Pen, Trash2 } from "lucide-react";

interface InventoryColumnProps {
  handleEdit: (row: InventoryType) => void;
  handleDelete: (row: InventoryType) => void;
}

export const InventoryColumns = ({
  handleEdit,
  handleDelete,
}: InventoryColumnProps): ColumnDef<InventoryType>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as string;
      const color =
        category === "Product"
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800";

      return (
        <span className={`px-2 py-1 rounded-md ${color}`}>{category}</span>
      );
    },
  },
  {
    accessorKey: "item_name",
    header: "Item Name",
    cell: ({ row }) => <div>{row.getValue("item_name")}</div>,
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => <div>{row.getValue("stock")}</div>,
  },
  {
    accessorKey: "unit_price",
    header: "Unit Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("unit_price"));
      return <div>₱{price.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground">
          {row.getValue("created_at")}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-right w-full">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-2">
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
