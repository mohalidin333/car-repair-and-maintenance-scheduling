"use client";

import React from "react";
import { DateRangeComponent } from "./date-range-component";
import { useFilters } from "@/hooks/use-filters";
import TableComponent from "@/components/features/table-component";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import FilterComponent from "@/components/features/filter-component";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

type DataType = {
  timestamp: string;
  user: string;
  action: string;
  status: "success" | "error";
  message: string;
};

const data: DataType[] = [
  {
    timestamp: "2025-05-01T09:15:23",
    user: "John Doe",
    action: "Created a new user",
    status: "success",
    message: "User account initialized and email sent.",
  },
  {
    timestamp: "2025-05-01T10:45:00",
    user: "Jane Smith",
    action: "Updated user permissions",
    status: "success",
    message: "Admin rights granted successfully.",
  },
  {
    timestamp: "2025-05-02T02:30:00",
    user: "Admin Bot",
    action: "Scheduled backup",
    status: "success",
    message: "Backup will run at 3:00 AM.",
  },
  {
    timestamp: "2025-05-02T14:10:45",
    user: "John Doe",
    action: "Deleted user account",
    status: "success",
    message: "User data purged permanently.",
  },
  {
    timestamp: "2025-05-03T08:00:00",
    user: "Alice Green",
    action: "Reset password",
    status: "success",
    message: "Password recovery link sent to email.",
  },
  {
    timestamp: "2025-05-03T08:05:32",
    user: "Michael Chan",
    action: "Logged in",
    status: "success",
    message: "Session started from IP 192.168.1.10.",
  },
  {
    timestamp: "2025-05-04T17:42:19",
    user: "Jane Smith",
    action: "Logged out",
    status: "success",
    message: "User logged out manually.",
  },
  {
    timestamp: "2025-05-04T23:55:00",
    user: "System",
    action: "Auto-cleanup of logs",
    status: "success",
    message: "Logs older than 30 days were removed.",
  },
  {
    timestamp: "2025-05-05T11:12:00",
    user: "Alice Green",
    action: "Updated system settings",
    status: "success",
    message: "New preferences applied.",
  },
  {
    timestamp: "2025-05-05T13:20:00",
    user: "Michael Chan",
    action: "Created report",
    status: "success",
    message: "Monthly report ready for download.",
  },
  {
    timestamp: "2025-05-06T07:45:30",
    user: "John Doe",
    action: "Imported data",
    status: "error",
    message: "3 records skipped due to missing fields.",
  },
  {
    timestamp: "2025-05-06T08:10:00",
    user: "Jane Smith",
    action: "Exported records",
    status: "success",
    message: "Data exported successfully.",
  },
  {
    timestamp: "2025-05-07T09:30:00",
    user: "Alice Green",
    action: "Changed email",
    status: "success",
    message: "Verification sent to new address.",
  },
  {
    timestamp: "2025-05-07T03:20:10",
    user: "System",
    action: "Database backup completed",
    status: "success",
    message: "Encrypted copy uploaded to S3.",
  },
  {
    timestamp: "2025-05-08T06:18:00",
    user: "John Doe",
    action: "Attempted login",
    status: "error",
    message: "3 failed attempts in last 24 hours.",
  },
  {
    timestamp: "2025-05-08T11:50:22",
    user: "Michael Chan",
    action: "Uploaded a file",
    status: "success",
    message: "Invoice_Q2.pdf uploaded to /invoices.",
  },
  {
    timestamp: "2025-05-09T12:10:00",
    user: "Jane Smith",
    action: "Removed API key",
    status: "success",
    message: "API access disabled for key ID #123.",
  },
  {
    timestamp: "2025-05-09T14:40:00",
    user: "Alice Green",
    action: "Generated invoice",
    status: "success",
    message: "Invoice #204 sent to client@example.com.",
  },
  {
    timestamp: "2025-05-10T15:20:00",
    user: "Michael Chan",
    action: "Viewed audit logs",
    status: "success",
    message: "Last 100 entries retrieved.",
  },
  {
    timestamp: "2025-05-10T16:30:00",
    user: "Admin Bot",
    action: "Security scan completed",
    status: "success",
    message: "System health is optimal.",
  },
];

const dataColumns: ColumnDef<DataType>[] = [
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => <div>{row.getValue("timestamp")}</div>,
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => <div>{row.getValue("user")}</div>,
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <div>{row.getValue("action")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="flex">
          <p
            className={`${
              row.getValue("status") === "success"
                ? "bg-green-50 border border-green-300"
                : "bg-red-50 border border-red-300"
            } text-sm px-2 rounded-md`}
          >
            {row.getValue("status")}
          </p>
        </div>
      );
    },
    enableColumnFilter: true,
  },

  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => <div>{row.getValue("message")}</div>,
  },
];

export default function AuditLogsPage() {
  const { handleFilter, columnFilters, setColumnFilters } = useFilters();
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex-wrap flex items-center gap-4 justify-between">
        <h2 className="text-lg">Audit Logs</h2>
        <div className="flex-wrap flex items-center gap-2">
          <DateRangeComponent />
          <FilterComponent>
            <DropdownMenuItem
              onSelect={() => handleFilter("status", "")}
              className="p-1 cursor-pointer"
            >
              all
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => handleFilter("status", "success")}
              className="p-1 cursor-pointer"
            >
              success
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => handleFilter("status", "error")}
              className="p-1 cursor-pointer"
            >
              error
            </DropdownMenuItem>
          </FilterComponent>
          <Button size={"sm"} variant={"destructive"}>
            <Trash2 size={15} /> Clear
          </Button>
        </div>
      </div>

      <TableComponent
        data={data}
        columns={dataColumns}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
    </div>
  );
}
