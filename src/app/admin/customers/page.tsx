"use client";

import React, { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TableComponent from "@/components/features/table-component";
import SearchComponent from "@/components/features/search-component";
import FilterComponent from "@/components/features/filter-component";
import { CustomersData } from "./customers-data";
import { CustomersColumns } from "./customers-column";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useFilters } from "@/hooks/use-filters";
import { useRouter } from "next/navigation";
import Invoice from "./invoice";

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

const customerDetails = {
  invoice_id: "1234",
  firstname: "John",
  lastname: "Doe",
  contact: "1234567890",
  address: "123 Main St",
  car_name: "Honda Civic",
  plate_number: "ABC123",
  issue_description: "Engine problem",
  car_images: [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
  ],
  schedule: "Tuesday May 7, 10:00 AM",
  service: {
    service_type: "Repair",
    service_name: "Air Conditioning Repair",
    service_fee: 3500.0,
    description:
      "Diagnose and repair issues with the vehicle's air conditioning system.",
  },
  inventory: [
    {
      category: "Product",
      item_name: "Premium Office Chair",
      quantity: 1,
      total_price: 129.99,
    },
  ],
  total: 3500.0,
  status: "Pending" as Status,
  created_at: "2023-05-07T10:00:00Z",
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
  const [invoice, setInvoice] = useState<CustomerDetailsType | null>(null);

  const handleProcess = (row: number) => {
    router.push(`/admin/customers/${row}`);
  };

  const handleInvoice = () => {
    setInvoice(customerDetails);
  };

  const columns = CustomersColumns({ handleProcess, handleInvoice });

  const handleWalkIn = () => {
    router.push("/admin/customers/walk-in");
  };

  return (
    <div className="p-4 flex flex-col gap-4">
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
        data={CustomersData}
        columns={columns}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />

      {invoice && <Invoice customerDetails={invoice} onClose={() => setInvoice(null)} />}
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
