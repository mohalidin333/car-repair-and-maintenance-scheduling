"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserType } from "./user-type";
import { Pen, Trash2 } from "lucide-react";
import { ReactNode } from "react";

interface UserColumnProps {
  handleEdit: (row: UserType) => void;
  handleDelete: (row: UserType) => void;
}

export const UserColumns = ({
  handleEdit,
  handleDelete,
}: UserColumnProps): ColumnDef<UserType>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) =>  <div>{String(row.getValue("id")).slice(0, 5)}...</div>
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const colors = {
        Admin: "bg-red-100 text-red-800",
        Staff: "bg-blue-100 text-blue-800",
        Customer: "bg-green-100 text-green-800",
      };

      const role = row.getValue("role") as keyof typeof colors;

      return (
        <span className={`px-2 py-1 rounded-md  ${colors[role]}`}>{role}</span>
      );
    },
    enableColumnFilter: true,
  },
  {
    accessorFn: (row) => `${row.firstname} ${row.lastname}`,
    id: "fullname",
    header: "Full Name",
    cell: ({ row }) => <div>{row.getValue("fullname")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },

  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => (
      <div className="text-gray-500">{row.getValue("created_at")}</div>
    ),
  },
  {
    accessorKey: "actions",
    header: () => <div className="w-full text-right">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="justify-end flex items-center gap-2">
          <button
            onClick={() => handleEdit(row.original)}
            className="bg-blue-300 text-blue-900 px-2 py-1 rounded-md cursor-pointer"
          >
            <Pen size={15} />
          </button>
          <button
            onClick={() => handleDelete(row.original)}
            className="bg-red-300 text-red-900 px-2 py-1 rounded-md cursor-pointer"
          >
            <Trash2 size={15} />
          </button>
        </div>
      );
    },
  },
  {
    id: "search",
    accessorFn: () => "",
    cell: () => null,
    header: () => null,
    enableColumnFilter: true,
    filterFn: (row, id, value) => {
      const firstname = row.original.firstname.toLowerCase();
      const lastname = row.original.lastname.toLowerCase();
      return firstname.includes(value) || lastname.includes(value);
    },
  },
];
