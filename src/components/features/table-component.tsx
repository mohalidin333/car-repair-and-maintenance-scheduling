"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  Updater,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";

type PropsType<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  columnFilters: ColumnFiltersState;
  setColumnFilters: (filters: Updater<ColumnFiltersState>) => void;
  className?: string;
};

export default function TableComponent<T>({
  data,
  columns,
  columnFilters,
  setColumnFilters,
  className,
}: PropsType<T>) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination,
      sorting,
      columnFilters,
    },
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="flex flex-col gap-4">
      <div className={`${className} border rounded-md overflow-x-auto`}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className="px-4"
                      >
                        <div className="flex items-center gap-2">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}

                          {{
                            asc: <ChevronUp size={13} />,
                            desc: <ChevronDown size={13} />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow key={row.id} className="bg-white">
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id} className="px-4">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow className="bg-white">
                <TableCell
                  colSpan={columns.length}
                  className="px-4 text-center"
                >
                  No data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* pagination */}
      {table.getCoreRowModel().rows.length > 10 && (
        <div className="flex gap-2 justify-end">
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            variant={"outline"}
            size={"sm"}
          >
            <ArrowLeft size={15} />
          </Button>
          <div className="flex items-center">
            <span className="bg-white border px-3 h-8 grid place-items-center text-sm rounded">
              {table.getState().pagination.pageIndex + 1}
            </span>
            <span className="bg-white border px-3 h-8 grid place-items-center text-sm rounded">
              {table.getPageCount()}
            </span>
          </div>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            variant={"outline"}
            size={"sm"}
          >
            <ArrowRight size={15} />
          </Button>
        </div>
      )}
    </div>
  );
}
