"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserType } from "./user-type";
import { Pen, Trash2 } from "lucide-react";

interface UserColumnProps {
  onEdit: (row: UserType) => void;
  onDelete: (row: UserType) => void;
}

export const UserColumns = ({ onEdit, onDelete }: UserColumnProps): ColumnDef<UserType>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "firstname",
    header: "First Name",
    cell: ({ row }) => <div>{row.getValue("firstname")}</div>,
  },
  {
    accessorKey: "lastname",
    header: "Last Name",
    cell: ({ row }) => <div>{row.getValue("lastname")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const colors = {
        admin: "bg-red-50 border border-red-300",
        user: "bg-green-50 border border-green-300",
        editor: "bg-blue-50 border border-blue-300",
      };

      const role = row.getValue("role") as keyof typeof colors;

      return (
        <div className="flex items-center">
          <p className={`flex text-sm px-2 rounded-md ${colors[role]}`}>
            {role}
          </p>
        </div>
      );
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "actions",
    header: () => <div className="w-full text-right">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="justify-end flex items-center gap-2">
          <button
            onClick={() => onEdit(row.original)}
            className="bg-blue-300 text-blue-900 px-2 py-1 rounded-md cursor-pointer"
          >
            <Pen size={15} />
          </button>
          <button
            onClick={() => onDelete(row.original)}
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
