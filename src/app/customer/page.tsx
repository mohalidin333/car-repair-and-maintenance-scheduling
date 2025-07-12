"use client";

import React, { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TableComponent from "@/components/features/table-component";
import FilterComponent from "@/components/features/filter-component";
import { CustomersColumns } from "./customer-column";
import { CustomersData } from "./customer-data";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useFilters } from "@/hooks/use-filters";
import { useRouter } from "next/navigation";
import Invoice from "./invoice";
import CancelModalComponent from "./cancel-modal-component";
import GCashPayment from "./gcash-modal";

export type Status =
  | "Pending"
  | "Approved"
  | "Disapproved"
  | "Cancelled"
  | "Completed"
  | "In-Progress";

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
    "https://images.unsplash.com/photo-1494976688153-d4d29ba9a4b5?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
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
      item_name: "AC Compressor",
      quantity: 1,
      total_price: 129.99,
    },
  ],
  total: 3500.0,
  status: "Pending" as Status,
  follow_up_date: "",
  follow_up_notes: [
    {
      id: "1",
      date: "2024-05-10",
      note: "Customer called regarding AC still not working properly. Scheduled for re-inspection.",
      createdAt: "2024-05-10T14:30:00Z",
    },
  ],
  created_at: "2023-05-07T10:00:00Z",
};

const service_type = [
  {
    label: "All",
    Value: "",
  },
  {
    label: "Repair",
    Value: "repair",
  },
  {
    label: "Maintenance",
    Value: "maintenance",
  },
];

const status = [
  {
    label: "All",
    Value: "",
  },
  {
    label: "Pending",
    Value: "pending",
  },
  {
    label: "Approved",
    Value: "approved",
  },
  {
    label: "Disapproved",
    Value: "disapproved",
  },
  {
    label: "Cancelled",
    Value: "cancelled",
  },
  {
    label: "In Progress",
    Value: "in progress",
  },
  {
    label: "Completed",
    Value: "completed",
  },
];

const serviceStatus = [
  {
    title: "Pending",
    value: 5,
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    title: "Approved",
    value: 10,
    color: "bg-green-100 text-green-800",
  },
  {
    title: "Disapproved",
    value: 1,
    color: "bg-gray-100 text-gray-800",
  },
  {
    title: "Cancelled",
    value: 2,
    color: "bg-red-100 text-red-800",
  },
  {
    title: "In-Progress",
    value: 3,
    color: "bg-blue-100 text-blue-800",
  },
  {
    title: "Completed",
    value: 10,
    color: "bg-emerald-100 text-emerald-800",
  },
];

function CustomerDashboard() {
  const { handleFilter, columnFilters, setColumnFilters } = useFilters();
  const router = useRouter();
  const [showInvoice, setShowInvoice] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [isGcashModalShow, setIsGcashModalShow] = useState(false);

  const handleOpenNewTab = () => {
    window.open("/schedule", "_blank");
  };

  const handleEdit = (row: any) => {
    router.push(`/customer/edit/${row}`);
  };
  const handleCancel = (row: any) => {
    setShowCancel(true);
  };
  const handleView = (row: any) => {
    setIsGcashModalShow(true);
  };
  const handleInvoice = (row: any) => {
    setShowInvoice(true);
  };

  const columns = CustomersColumns({
    handleEdit,
    handleCancel,
    handleView,
    handleInvoice,
  });

  return (
    <main className="overflow-y-auto space-y-4 py-8 max-w-screen-xl mx-auto">
      {/* header */}
      <header className="flex-wrap flex items-center justify-between gap-4">
        {/* title */}
        <div>
          <span className="font-bold text-lg">Dashboard</span>
          <p className="text-sm text-muted-foreground">
            Manage your appointments.
          </p>
        </div>
        {/* actions */}
        <div className="flex justify-end gap-2">
          {/* service type filter */}
          <FilterComponent title="Service Type">
            {service_type.map((item) => (
              <DropdownMenuItem
                key={item.Value}
                onClick={() => handleFilter("service_type", item.Value)}
                className="capitalize px-2 py-1 cursor-pointer"
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </FilterComponent>
          {/* status filter */}
          <FilterComponent title="Status">
            {status.map((item) => (
              <DropdownMenuItem
                key={item.Value}
                onClick={() => handleFilter("status", item.Value)}
                className="capitalize px-2 py-1 cursor-pointer"
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </FilterComponent>
          {/* add user */}
          <Button onClick={handleOpenNewTab}>
            <Plus /> Appoint
          </Button>
        </div>
      </header>

      {/* status cards */}
      <div className="rounded-md border divide-x bg-white grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] w-full">
        {serviceStatus.map((card, index) => (
          <div
            key={index}
            className="p-4 flex items-center  justify-between gap-4 flex-col w-full"
          >
            <p
              className="font-bold text-xl"
              aria-label={`${card.title}: ${card.value}`}
            >
              {CustomersData.filter((item) => item.status == card.title).length}
            </p>
            <span
              className={`text-sm rounded-md px-2 py-1 font-semibold ${card.color}`}
            >
              {card.title}
            </span>
          </div>
        ))}
      </div>

      {/* table */}
      <TableComponent
        data={CustomersData}
        columns={columns}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        className="w-full"
      />

      {showInvoice && (
        <Invoice
          onClose={() => setShowInvoice(false)}
          customerDetails={customerDetails}
        />
      )}

      {showCancel && <CancelModalComponent ok={() => setShowCancel(false)} />}
        {isGcashModalShow && (
          <GCashPayment onClose={() => setIsGcashModalShow(false)} amountToPay={1000} adminName="John Doe" adminNumber="1234567890" onSubmit={(amt, ref) => console.log(amt, ref)}/>
        )}
    </main>
  );
}

export default function CustomerDashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomerDashboard />
    </Suspense>
  );
}
