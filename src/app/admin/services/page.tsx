"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TableComponent from "@/components/features/table-component";
import FilterComponent from "@/components/features/filter-component";
import { ServiceColumns } from "./service-column";
import { ServiceType } from "./service-type";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useFilters } from "@/hooks/use-filters";
import AddServiceModalComponent from "./add-service-modal-component";
import EditServiceModalComponent from "./edit-service-modal-component";
import { useRouter, useSearchParams } from "next/navigation";
import DeleteConfirmationModalComponent from "@/components/modals/delete-confirmation-modal-component";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

function Services() {
  const { handleFilter, columnFilters, setColumnFilters } = useFilters();
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [services, setServices] = useState<ServiceType[]>([]);
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

  const handleDeleteUser = async () => {
    if (service) {
      try {
        await createClient().from("services").delete().eq("id", service.id);
        toast.success("Service deleted successfully");
      } catch (error) {
        toast.error((error as Error).message);
      }
    }
  };

  const columns = ServiceColumns({ handleEdit, handleDelete });

  useEffect(() => {
    const getData = async () => {
      try {
        const { data: services } = await createClient()
          .from("services")
          .select("*");

        setServices(services as ServiceType[]);
      } catch (error) {
        toast.error((error as Error).message);
      }
    };
    getData();
  }, []);

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
        data={services}
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
