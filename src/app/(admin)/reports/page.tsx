"use client";

import React from "react";
import { DateRangeComponent } from "./date-range-component";
import { Button } from "@/components/ui/button";
import { FileText, Layers2, Printer } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import TableComponent from "@/components/features/table-component";
import { ColumnDef } from "@tanstack/react-table";
import { useFilters } from "@/hooks/use-filters";

type DataType = {
  id: number;
  name: string;
  email: string;
  date: string;
}

const data: DataType[] = [
  { id: 1, name: "Alice Reyes", email: "alice.reyes@example.com", date: "2025-05-01" },
  { id: 2, name: "Brian Cruz", email: "brian.cruz@example.com", date: "2025-05-02" },
  { id: 3, name: "Carla Santos", email: "carla.santos@example.com", date: "2025-05-03" },
  { id: 4, name: "Daniel Lim", email: "daniel.lim@example.com", date: "2025-05-04" },
  { id: 5, name: "Ella Tan", email: "ella.tan@example.com", date: "2025-05-05" },
  { id: 6, name: "Francis Lee", email: "francis.lee@example.com", date: "2025-05-06" },
  { id: 7, name: "Grace Yu", email: "grace.yu@example.com", date: "2025-05-07" },
  { id: 8, name: "Henry Gomez", email: "henry.gomez@example.com", date: "2025-05-08" },
  { id: 9, name: "Isabel Cruz", email: "isabel.cruz@example.com", date: "2025-05-09" },
  { id: 10, name: "Jake Ramos", email: "jake.ramos@example.com", date: "2025-05-10" },
  { id: 11, name: "Kara Dela Cruz", email: "kara.delacruz@example.com", date: "2025-05-11" },
  { id: 12, name: "Leo Navarro", email: "leo.navarro@example.com", date: "2025-05-12" },
  { id: 13, name: "Maya Chua", email: "maya.chua@example.com", date: "2025-05-13" },
  { id: 14, name: "Noel Ong", email: "noel.ong@example.com", date: "2025-05-14" },
  { id: 15, name: "Olivia Reyes", email: "olivia.reyes@example.com", date: "2025-05-15" },
  { id: 16, name: "Paul Co", email: "paul.co@example.com", date: "2025-05-16" },
  { id: 17, name: "Queenie Sy", email: "queenie.sy@example.com", date: "2025-05-17" },
  { id: 18, name: "Rico Lopez", email: "rico.lopez@example.com", date: "2025-05-18" },
  { id: 19, name: "Sofia David", email: "sofia.david@example.com", date: "2025-05-19" },
  { id: 20, name: "Tommy Cruz", email: "tommy.cruz@example.com", date: "2025-05-20" },
];


const dataColumns: ColumnDef<DataType>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div className="lowercase">{row.getValue("date")}</div>,
  },
];


export default function ReportsPage() {
  const { columnFilters, setColumnFilters } = useFilters();

  return (
    <div className="p-4 flex flex-col gap-4">
      <header className="flex items-center justify-between gap-4 flex-wrap">
        <span className="font-bold text-lg">Reports</span>

        <div className="flex items-center gap-2 flex-wrap">
          <DateRangeComponent />

          <div className="flex items-center gap-2 flex-wrap">
            <Button variant={"outline"} size={"sm"} className="text-xs">
              <FileText size={15} /> Export PDF
            </Button>
            <Button variant={"outline"} size={"sm"} className="text-xs">
              <Layers2 size={15} /> Export Excel
            </Button>
            <Button size={"sm"} className="text-xs">
              <Printer size={15} /> Print Page
            </Button>
          </div>
        </div>
      </header>

      {/* tables */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        <div className="space-y-4 bg-white rounded-md p-4 border">
          <header className="flex items-center justify-between gap-4">
            <span className="font-bold">Table 1</span>

            <Checkbox />
          </header>

          <TableComponent
            data={data}
            columns={dataColumns}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        </div>
        <div className="space-y-4 bg-white rounded-md p-4 border">
          <header className="flex items-center justify-between gap-4">
            <span className="font-bold">Table 2</span>

            <Checkbox />
          </header>

          <TableComponent
            data={data}
            columns={dataColumns}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        <div className="space-y-4 bg-white rounded-md p-4 border">
          <header className="flex items-center justify-between gap-4">
            <span className="font-bold">Table 3</span>

            <Checkbox />
          </header>

          <TableComponent
            data={data}
            columns={dataColumns}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        </div>
        <div className="space-y-4 bg-white rounded-md p-4 border">
          <header className="flex items-center justify-between gap-4">
            <span className="font-bold">Table 4</span>

            <Checkbox />
          </header>

          <TableComponent
            data={data}
            columns={dataColumns}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        </div>
      </div>
    </div>
  );
}
