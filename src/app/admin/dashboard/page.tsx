"use client";

import { Eye, PhilippinePeso, ShoppingCart, Wrench } from "lucide-react";
import React from "react";
import { ServiceSalesChart } from "./service-sales-chart";
import { useRouter } from "next/navigation";
import { InventorySalesChart } from "./inventory-sales-chart";

const systemData = [
  {
    title: "Total Sales",
    value: 13000,
    icon: PhilippinePeso,
    color: "bg-green-100 text-green-800",
  },
  {
    title: "Services Sales",
    value: 10000,
    icon: Wrench,
    color: "bg-blue-100 text-blue-800",
  },
  {
    title: "Products/Parts Sales",
    value: 3000,
    icon: ShoppingCart,
    color: "bg-yellow-100 text-yellow-800",
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

export type NewAppointmentType = {
  id: number;
  schedule: string;
};

export type InProgressType = {
  id: number;
  car_name: string;
  plate_number: string;
  service_name: string;
  status: string;
};

const newAppointmentData: NewAppointmentType[] = [
  {
    id: 1,
    schedule: "Tuesday May 7, 10:00 AM",
  },
  {
    id: 2,
    schedule: "Tuesday May 7, 10:00 AM",
  },
  {
    id: 3,
    schedule: "Tuesday May 7, 10:00 AM",
  },
  {
    id: 4,
    schedule: "Tuesday May 7, 10:00 AM",
  },
  {
    id: 5,
    schedule: "Tuesday May 7, 10:00 AM",
  },
];

const inProgressData: InProgressType[] = [
  {
    id: 1,
    car_name: "Toyota",
    plate_number: "ABC123",
    service_name: "Oil Change",
    status: "In-Progress",
  },
  {
    id: 2,
    car_name: "Honda",
    plate_number: "XYZ456",
    service_name: "Tire Rotation",
    status: "In-Progress",
  },
  {
    id: 3,
    car_name: "Ford",
    plate_number: "LMN789",
    service_name: "Brake Inspection",
    status: "In-Progress",
  },
  {
    id: 4,
    car_name: "Mazda",
    plate_number: "DEF321",
    service_name: "Battery Replacement",
    status: "In-Progress",
  },
  {
    id: 5,
    car_name: "Hyundai",
    plate_number: "GHI654",
    service_name: "Air Filter Check",
    status: "In-Progress",
  },
];

export default function DashboardPage() {
  const router = useRouter();

  const handleProcess = (row: NewAppointmentType | InProgressType) => {
    router.push("/admin/customers/" + row.id);
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* overview */}
      <section className="flex flex-col gap-4">
        <div className="">
          <h2 className="text-lg">Overview</h2>
          <p className="text-muted-foreground text-sm">
            Monitor total sales, service progress, and key operational insights.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 w-full">
          {systemData.map((card, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-md flex items-center justify-between gap-4 border"
            >
              <div className="flex flex-col gap-2">
                <p className="font-bold text-xl">
                  ₱{card.value.toLocaleString()}
                </p>
                <p className="text-xs uppercase text-muted-foreground font-semibold">
                  {card.title}
                </p>
              </div>

              <div className={`${card.color} p-2 rounded-md`}>
                <card.icon size={20} />
              </div>
            </div>
          ))}
        </div>

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
      </section>

      {/* charts / analytics */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className=" text-lg">Analytics</h2>
          <p className="text-muted-foreground text-sm">
            Visual insights on service and sales trends.
          </p>
        </div>
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
          <ServiceSalesChart />
          <InventorySalesChart />
        </div>
      </section>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        {/* upcoming schedules */}
        <div className="border bg-white rounded-md self-start">
          <div className="border-b p-4 space-x-2 flex items-center">
            <h1 className="text-lg ">Upcoming Schedules</h1>
            <div className="p-1 bg-red-600 rounded-full"></div>
          </div>

          <div className="px-4 pt-4 space-y-4 divide-y">
            {newAppointmentData.map((row, index) => (
              <div
                key={index}
                className="pb-4 flex items-center justify-between"
              >
                <p>{row.schedule}</p>
                <button
                  onClick={() => handleProcess(row)}
                  className="border hover:bg-blue-300 border-blue-300 text-blue-800 px-2 py-1 rounded-md cursor-pointer"
                >
                  <Eye size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* in progress */}
        <div className="border bg-white rounded-md self-start">
          <div className="border-b p-4 space-x-2 flex items-center">
            <h1 className="text-lg">In Progress</h1>
            <div className="p-1 bg-green-600 rounded-full"></div>
          </div>

          <div className="px-4 pt-4 space-y-4 divide-y">
            {inProgressData.map((row, index) => (
              <div
                key={index}
                className="pb-4 flex items-center justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <p className="font-semibold">{row.service_name}</p>
                    <span className="text-sm text-green-800 bg-green-100 px-2 py-1 rounded-md">
                      In Progress
                    </span>
                  </div>
                  <p>{row.car_name}</p>
                  <p className="text-sm text-muted-foreground">
                    {row.plate_number}
                  </p>
                </div>
                <button
                  onClick={() => handleProcess(row)}
                  className="border hover:bg-blue-300 border-blue-300 text-blue-800 px-2 py-1 rounded-md cursor-pointer"
                >
                  <Eye size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
