"use client";

import React, { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TableComponent from "@/components/features/table-component";
import FilterComponent from "@/components/features/filter-component";
import { InventoryColumns } from "./inventory-column";
import { InventoryData } from "./inventory-data";
import { InventoryType } from "./inventory-type";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useFilters } from "@/hooks/use-filters";
import AddInventoryModalComponent from "./add-inventory-modal-component";
import EditInventoryModalComponent from "./edit-inventory-modal-component";
import { useRouter, useSearchParams } from "next/navigation";

function Inventory() {
  const { handleFilter, columnFilters, setColumnFilters } = useFilters();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [inventory, setInventory] = useState<InventoryType | null>(null);
  const router = useRouter();
  const params = useSearchParams();
  const id = params?.get("id");

  const handleEdit = (row: InventoryType) => {
    router.push(`/admin/inventory?id=${row.id}`);
    setInventory(row);
  };
  const handleDelete = (row: InventoryType) => {
    console.log(row);
  };

  const columns = InventoryColumns({ handleEdit, handleDelete });

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* header */}
      <header className="flex-wrap flex items-center justify-between gap-4">
        {/* title */}
        <div>
          <span className="font-bold text-lg">Inventory</span>
          <p className="text-sm text-muted-foreground">
            Manage products and parts here.
          </p>
        </div>
        {/* actions */}
        <div className="flex justify-end gap-2">
          {/* filter */}
          <FilterComponent title="Category">
            <DropdownMenuItem
              onSelect={() => handleFilter("category", "")}
              className="p-1 cursor-pointer"
            >
              All
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => handleFilter("category", "Product")}
              className="p-1 cursor-pointer"
            >
              Product
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => handleFilter("category", "Part")}
              className="p-1 cursor-pointer"
            >
              Part
            </DropdownMenuItem>
          </FilterComponent>
          {/* add user */}
          <Button onClick={() => setModalOpen(true)}>
            <Plus /> Add Item
          </Button>
        </div>
      </header>
      {/* table */}
      <TableComponent
        data={InventoryData}
        columns={columns}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />

      {/* add user modal */}
      {modalOpen && <AddInventoryModalComponent isOpenModal={setModalOpen} />}
      {id && <EditInventoryModalComponent inventory={inventory} />}
    </div>
  );
}

export default function InventoryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Inventory />
    </Suspense>
  );
}
