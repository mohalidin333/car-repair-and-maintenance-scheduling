"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TableComponent from "@/components/features/table-component";
import SearchComponent from "@/components/features/search-component";
import FilterComponent from "@/components/features/filter-component";
import { CustomersColumns } from "./customers-column";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useFilters } from "@/hooks/use-filters";
import { useRouter } from "next/navigation";
import Invoice from "./invoice";
import { createClient } from "@/lib/supabase/client";
import { AppointmentType } from "@/app/customer/appointment-type";

export type Status =
  | "Pending"
  | "Approved"
  | "Disapproved"
  | "Cancelled"
  | "Completed"
  | "In-Progress";

export type CustomerDetailsType = {
  invoice_id: string;
  firstname: string;
  lastname: string;
  contact: string;
  address: string;
  car_name: string;
  plate_number: string;
  issue_description: string;
  car_images: string[];
  schedule: string;
  service: {
    service_type: string;
    service_name: string;
    service_fee: number;
    description: string;
  };
  inventory: {
    category: string;
    item_name: string;
    quantity: number;
    total_price: number;
  }[];
  total: number;
  status: Status;
  created_at: string;
};

const filterByServiceType = [
  { label: "All", value: "" },
  { label: "Repair", value: "Repair" },
  { label: "Maintenance", value: "Maintenance" },
];

const filterByStatus = [
  { label: "All", value: "" },
  { label: "Pending", value: "Pending" },
  { label: "Confirmed", value: "Confirmed" },
  { label: "Cancelled", value: "Cancelled" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" },
];

function Customers() {
  const { handleFilter, columnFilters, setColumnFilters } = useFilters();
  const router = useRouter();
  const [invoice, setInvoice] = useState<AppointmentType | null>(null);
  const [customers, setCustomers] = useState<AppointmentType[]>([]);

  const handleProcess = (row: number) => {
    router.push(`/admin/customers/${row}`);
  };

  const handleInvoice = (row: AppointmentType) => {
    setInvoice(row)
  };

  const columns = CustomersColumns({ handleProcess, handleInvoice });

  const handleWalkIn = () => {
    router.push("/admin/customers/walk-in");
  };

  useEffect(() => {
    const getCustomers = async () => {
      const { error, data: customerList } = await createClient()
        .from("appointments")
        .select("*");

      if (error) throw error;

      setCustomers(customerList as AppointmentType[]);
    };

    getCustomers();
  }, []);

  return (
    <div className=" p-4 flex flex-col gap-4">
      {/* header */}
      <header className="flex-wrap flex items-center justify-between gap-4">
        {/* title */}
        <div>
          <span className="font-bold text-lg">Customers</span>
          <p className="text-sm text-muted-foreground">
            Manage and process customer appointments and services.
          </p>
        </div>
        {/* actions */}
        <div className="flex justify-end gap-2">
          {/* search */}
          <SearchComponent
            onChange={(e) => handleFilter("search", e.target.value)}
          />
          {/* filter by service type */}
          <FilterComponent title="Service Type">
            {filterByServiceType.map((item) => (
              <DropdownMenuItem
                key={item.value}
                onSelect={() => handleFilter("service_type", item.value)}
                className="p-1 cursor-pointer"
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </FilterComponent>

          {/* filter by status */}
          <FilterComponent title="Status">
            {filterByStatus.map((item) => (
              <DropdownMenuItem
                key={item.value}
                onSelect={() => handleFilter("status", item.value)}
                className="p-1 cursor-pointer"
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </FilterComponent>

          {/* add user */}
          <Button onClick={handleWalkIn}>
            <Plus /> Walk-in
          </Button>
        </div>
      </header>
      {/* table */}
      <TableComponent
        data={customers}
        columns={columns}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />

      {invoice && (
        <Invoice appointmentDetails={invoice} onClose={() => setInvoice(null)} />
      )}
    </div>
  );
}

export default function CustomersPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Customers />
    </Suspense>
  );
}
