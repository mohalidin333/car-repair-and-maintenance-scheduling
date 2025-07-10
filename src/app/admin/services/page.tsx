"use client";

import React, { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TableComponent from "@/components/features/table-component";
import FilterComponent from "@/components/features/filter-component";
import { ServiceColumns } from "./service-column";
import { ServiceData } from "./service-data";
import { ServiceType } from "./service-type";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useFilters } from "@/hooks/use-filters";
import AddServiceModalComponent from "./add-service-modal-component";
import EditServiceModalComponent from "./edit-service-modal-component";
import { useRouter, useSearchParams } from "next/navigation";
import DeleteConfirmationModalComponent from "@/components/modals/delete-confirmation-modal-component";

function Services() {
  const { handleFilter, columnFilters, setColumnFilters } = useFilters();
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [service, setService] = useState<ServiceType | null>(null);
  const router = useRouter();
  const params = useSearchParams();
  const id = params?.get("id");

  const handleEdit = (row: ServiceType) => {
    router.push(`/admin/services?id=${row.id}`);
    setService(row);
  };

  const handleDelete = (row: ServiceType) => {
    setService(row);
    setDeleteModalOpen(true);
  };

  const handleDeleteUser = () => {
    if (setService) {
      console.log(setService);
    }
  };

  const columns = ServiceColumns({ handleEdit, handleDelete });

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* header */}
      <header className="flex-wrap flex items-center justify-between gap-4">
        {/* title */}
        <div>
          <span className="font-bold text-lg">Services</span>
          <p className="text-sm text-muted-foreground">Manage services here.</p>
        </div>
        {/* actions */}
        <div className="flex justify-end gap-2">
          {/* filter */}
          <FilterComponent title="Service Type">
            <DropdownMenuItem
              onSelect={() => handleFilter("service_type", "")}
              className="p-1 cursor-pointer"
            >
              All
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => handleFilter("service_type", "Maintenance")}
              className="p-1 cursor-pointer"
            >
              Maintenance
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => handleFilter("service_type", "Repair")}
              className="p-1 cursor-pointer"
            >
              Repair
            </DropdownMenuItem>
          </FilterComponent>
          {/* add user */}
          <Button onClick={() => setModalOpen(true)}>
            <Plus /> Add Service
          </Button>
        </div>
      </header>
      {/* table */}
      <TableComponent
        data={ServiceData}
        columns={columns}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />

      {/* add user modal */}
      {modalOpen && <AddServiceModalComponent isOpenModal={setModalOpen} />}
      {id && <EditServiceModalComponent service={service} />}
      {deleteModalOpen && (
        <DeleteConfirmationModalComponent
          setDeleteModalOpen={setDeleteModalOpen}
          handleDelete={handleDeleteUser}
        />
      )}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Services />
    </Suspense>
  );
}
