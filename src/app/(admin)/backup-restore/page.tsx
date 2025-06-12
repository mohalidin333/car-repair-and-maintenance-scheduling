"use client";

import TableComponent from "@/components/features/table-component";
import { Button } from "@/components/ui/button";
import { useFilters } from "@/hooks/use-filters";
import { ColumnDef } from "@tanstack/react-table";
import { DatabaseBackup, Download } from "lucide-react";
import React from "react";

interface DataType {
  table: string;
  size: string;
  data: string;
}

const TablesData: DataType[] = [
  {
    table: "users",
    size: "9GB",
    data: "10,000",
  },
  {
    table: "orders",
    size: "14GB",
    data: "25,000",
  },
  {
    table: "products",
    size: "7GB",
    data: "8,400",
  },
  {
    table: "categories",
    size: "12GB",
    data: "19,200",
  },
  {
    table: "transactions",
    size: "5GB",
    data: "4,300",
  },
  {
    table: "inventory",
    size: "10GB",
    data: "11,000",
  },
  {
    table: "payments",
    size: "6GB",
    data: "7,600",
  },
  {
    table: "reviews",
    size: "15GB",
    data: "26,700",
  },
  {
    table: "shipping_addresses",
    size: "8GB",
    data: "9,100",
  },
  {
    table: "audit_logs",
    size: "13GB",
    data: "21,500",
  },
];


const TablesColumns: ColumnDef<DataType>[] = [
  {
    accessorKey: "table",
    header: "Table",
    cell: ({ row }) => <div>{row.getValue("table")}</div>,
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => <div>{row.getValue("size")}</div>,
  },
  {
    accessorKey: "data",
    header: "Total Data",
    cell: ({ row }) => <div>{row.getValue("data")}</div>,
  },
  {
    accessorKey: "action",
    header: () => (
      <div className="flex justify-center w-full">
        <p>Action</p>
      </div>
    ),
    cell: () => {
      return (
        <div className="flex justify-center">
          <Button variant={"outline"} size={"sm"}>
            <DatabaseBackup size={15} />
          </Button>
        </div>
      );
    },
  },
];

const StoreColumns: ColumnDef<DataType>[] = [
  {
    accessorKey: "table",
    header: "Table",
    cell: ({ row }) => <div>{row.getValue("table")}</div>,
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => <div>{row.getValue("size")}</div>,
  },
  {
    accessorKey: "data",
    header: "Total Data",
    cell: ({ row }) => <div>{row.getValue("data")}</div>,
  },
  {
    accessorKey: "action",
    header: () => (
      <div className="flex justify-center w-full">
        <p>Action</p>
      </div>
    ),
    cell: () => {
      return (
        <div className="flex justify-center">
          <Button variant={"outline"} size={"sm"}>
            <Download size={15} />
          </Button>
        </div>
      );
    },
  },
];

export default function BackupRestorePage() {
  const { columnFilters, setColumnFilters } = useFilters();

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex items-center gap-4 justify-between">
        <h1 className="font-bold text-lg">Backup & Restore</h1>
      </div>

      {/* cards */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        <div className="flex flex-col gap-2 flex-1 bg-white border rounded-md p-4">
          <div className="flex items-center gap-2 justify-between">
            <h2 className="text-muted-foreground">Database</h2>
            <div className="bg-red-500 rounded-full w-2 h-2"></div>
          </div>
          <div>
            <p className="text-lg font-bold">9GB / 10K</p>
            <h3 className="text-sm text-muted-foreground">Total Size / Data</h3>
          </div>
        </div>

        <div className="flex flex-col gap-2 flex-1 bg-white border rounded-md p-4">
          <div className="flex items-center gap-2 justify-between">
            <h2 className="text-muted-foreground">Backup</h2>
            <div className="bg-red-500 rounded-full w-2 h-2"></div>
          </div>

          <div>
            <p className="text-lg font-bold">9GB / 10K</p>
            <h3 className="text-sm text-muted-foreground">Total Size / Data</h3>
          </div>
        </div>
      </div>

      {/* tables */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        <div className="flex flex-col gap-4 bg-white border rounded-md p-4">
          <h2>Tables</h2>
          <TableComponent
            data={TablesData}
            columns={TablesColumns}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        </div>
        <div className="flex flex-col gap-4 flex-1 bg-white border rounded-md p-4">
          <h2>Store</h2>
          <TableComponent
            data={TablesData}
            columns={StoreColumns}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        </div>
      </div>
    </div>
  );
}
