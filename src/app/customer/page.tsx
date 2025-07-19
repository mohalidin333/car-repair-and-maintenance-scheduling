"use client";

import React, { Suspense, use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TableComponent from "@/components/features/table-component";
import FilterComponent from "@/components/features/filter-component";
import { CustomersColumns } from "./customer-column";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useFilters } from "@/hooks/use-filters";
import { useRouter } from "next/navigation";
import Invoice from "./invoice";
import CancelModalComponent from "./cancel-modal-component";
import GCashPayment from "./gcash-modal";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { InventoryType } from "./inventory-type";
import { AppointmentType } from "./appointment-type";

export type Status =
  | "Pending"
  | "Approved"
  | "Disapproved"
  | "Cancelled"
  | "Completed"
  | "In-Progress";

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
function CustomerDashboard() {
  const { handleFilter, columnFilters, setColumnFilters } = useFilters();
  const router = useRouter();
  const [showInvoice, setShowInvoice] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [isGcashModalShow, setIsGcashModalShow] = useState(false);
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [serviceStatus, setServiceStatus] = useState<
    {
      title: string;
      value: number;
      color: string;
    }[]
  >([
    {
      title: "Pending",
      value: 0,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      title: "Approved",
      value: 0,
      color: "bg-green-100 text-green-800",
    },
    {
      title: "Disapproved",
      value: 0,
      color: "bg-gray-100 text-gray-800",
    },
    {
      title: "Cancelled",
      value: 0,
      color: "bg-red-100 text-red-800",
    },
    {
      title: "In-Progress",
      value: 0,
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: "Completed",
      value: 0,
      color: "bg-emerald-100 text-emerald-800",
    },
  ]);
  const [appointmentId, setAppointmentId] = useState<number | null>(0);
  const supabase = createClient();
  const [gcashDetails, setGcashDetails] = useState({
    name: "",
    number: "",
  });
  const [amount, setAmount] = useState(0);
  const [appointmentDetails, setAppointmentDetails] =
    useState<AppointmentType>();

  const handleOpenNewTab = () => {
    window.open("/schedule", "_blank");
  };

  const handleEdit = (row: any) => {
    router.push(`/customer/edit/${row}`);
  };

  const handleCancel = async (row: number) => {
    setAppointmentId(row);
    setShowCancel(true);

    // setShowCancel(true);
  };

  const handleCancelAppointment = async () => {
    if (appointmentId) {
      const { error } = await supabase
        .from("appointments")
        .update({ status: "Cancelled" })
        .eq("id", appointmentId);
      if (error) {
        toast.error(error.message);
      }
      toast.success("Appointment cancelled successfully");
      setShowCancel(false);
    }
  };

  const handleView = (id: number, amount: number) => {
    setIsGcashModalShow(true);
    setAppointmentId(id);
    setAmount(amount);
  };
  const handleInvoice = (row: AppointmentType) => {
    console.log(row);
    setShowInvoice(true);
    setAppointmentDetails(row);
  };

  const columns = CustomersColumns({
    handleEdit,
    handleCancel,
    handleView,
    handleInvoice,
  });

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const { data: user } = await supabase.auth.getUser();
        const { data: appointmentList, error } = await supabase
          .from("appointments")
          .select("*")
          .eq("user_id", user.user?.id);
        if (error) throw error;

        const filteredAppointments = appointmentList.map(
          (appointment: AppointmentType) => {
            let inventoryParsed: InventoryType = [];
            try {
              inventoryParsed =
                typeof appointment.inventory === "string"
                  ? JSON.parse(appointment.inventory)
                  : appointment.inventory;
            } catch (e) {
              console.error("Error parsing inventory:", e);
              inventoryParsed = [];
            }

            const inventory_fee = inventoryParsed.reduce(
              (total, item) => total + (item.total_price || 0),
              0
            );
            // return {
            //   id: appointment.id,
            //   schedule: appointment.schedule,
            //   service_type: appointment.service_type,
            //   service_name: appointment.service_name,
            //   total_fee: appointment.service_fee + inventory_fee,
            //   status: appointment.status,
            //   created_at: appointment.created_at,
            //   is_paid: appointment.is_paid,
            // };

            return {
              id: appointment.id,
              user_id: appointment.user_id,
              firstname: appointment.firstname,
              lastname: appointment.lastname,
              contact: appointment.contact,
              address: appointment.address,
              car_name: appointment.car_name,
              plate_number: appointment.plate_number,
              issue_description: appointment.issue_description,
              car_images: appointment.car_images,
              schedule: appointment.schedule,
              service_type: appointment.service_type,
              service_name: appointment.service_name,
              service: appointment.service,
              service_fee: appointment.service_fee,
              inventory: appointment.inventory,
              inventory_fee: appointment.inventory_fee,
              total_fee: appointment.service_fee + appointment.inventory_fee, // recalculate if needed
              appointment_type: appointment.appointment_type,
              status: appointment.status,
              follow_up_for: appointment.follow_up_for,
              follow_up_date: appointment.follow_up_date,
              created_at: appointment.created_at,
              is_paid: appointment.is_paid,
            };
          }
        );

        // Update service status counts
        setServiceStatus((prevStatus) =>
          prevStatus.map((statusItem) => ({
            ...statusItem,
            value: filteredAppointments.filter(
              (app) =>
                app.status.toLowerCase() === statusItem.title.toLowerCase()
            ).length,
          }))
        );

        setAppointments(filteredAppointments as AppointmentType[]);
      } catch (error) {
        toast.error((error as Error).message);
      }
    };

    const getGCashDetails = async () => {
      try {
        const { data: gcashDetails, error } = await supabase
          .from("payment_settings")
          .select("*");

        setGcashDetails({
          name: gcashDetails![0]?.name,
          number: gcashDetails![0]?.number,
        });
      } catch (error) {
        toast.error((error as Error).message);
      }
    };
    getGCashDetails();
    getAppointments();
  }, []);

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
              {card.value}
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
        data={appointments}
        columns={columns}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        className="w-full"
      />

      {showInvoice && (
        <Invoice
          appointmentDetails={appointmentDetails as AppointmentType}
          onClose={() => setShowInvoice(false)}
          customerDetails={customerDetails}
        />
      )}

      {showCancel && (
        <CancelModalComponent
          handleCancelAppointment={handleCancelAppointment}
          setShowCancel={setShowCancel}
        />
      )}
      {isGcashModalShow && (
        <GCashPayment
          appointmentId={appointmentId}
          onClose={() => setIsGcashModalShow(false)}
          amountToPay={amount}
          adminName={gcashDetails.name}
          adminNumber={gcashDetails.number}
        />
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
