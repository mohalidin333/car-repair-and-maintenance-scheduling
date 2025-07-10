"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  LucideIcon,
  PackageCheck,
  Plus,
  Settings,
  Wrench,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PiExclamationMark } from "react-icons/pi";

export type CustomerDetails = {
  firstname: string;
  lastname: string;
  contact: string;
};

type ServiceType = "Repair" | "Maintenance";
type Category = "Product" | "Part";

type Services = {
  name: string;
  category: ServiceType;
  icon: LucideIcon;
  description: string;
  serviceFee: number;
};

type Inventory = {
  category: Category;
  item: string;
  stock: number;
  price: number;
};

export type SelectedService = {
  service_name: string;
  service_fee: number;
};

export type SelectedInventory = {
  index: number;
  category: Category;
  item: string;
  stock: number;
  price: number;
  quantity: number;
  total_price: number;
};

type InventoryWithIndex = Inventory & { index: number };

const serviceType = [
  {
    name: "Repair",
    icon: Wrench,
  },
  {
    name: "Maintenance",
    icon: Settings,
  },
] as const;

const services: Services[] = [
  // 🔧 Repair services
  {
    name: "Brake Pad Replacement",
    category: "Repair",
    icon: Wrench,
    description: "Replace worn-out brake pads for safety and performance.",
    serviceFee: 2500,
  },
  {
    name: "Starter Repair",
    category: "Repair",
    icon: Wrench,
    description: "Repair or replace a faulty starter to fix starting issues.",
    serviceFee: 3500,
  },
  {
    name: "Radiator Repair",
    category: "Repair",
    icon: Wrench,
    description: "Fix cooling system issues to prevent engine overheating.",
    serviceFee: 3000,
  },
  {
    name: "Transmission Repair",
    category: "Repair",
    icon: Wrench,
    description:
      "Diagnose and repair transmission issues affecting gear shifting.",
    serviceFee: 8000,
  },
  {
    name: "Engine Troubleshooting",
    category: "Repair",
    icon: Wrench,
    description: "Investigate and diagnose engine performance issues.",
    serviceFee: 1500,
  },
  {
    name: "Check Engine Light Diagnostics",
    category: "Repair",
    icon: Wrench,
    description:
      "Scan onboard computer and identify the cause of warning lights.",
    serviceFee: 1000,
  },
  {
    name: "Electrical System Diagnostics",
    category: "Repair",
    icon: Wrench,
    description:
      "Identify faults in the vehicle's electrical components and systems.",
    serviceFee: 1200,
  },
  {
    name: "Flat Tire Replacement",
    category: "Repair",
    icon: Wrench,
    description: "Replace or repair a flat tire at the shop or on-site.",
    serviceFee: 600,
  },
  {
    name: "Battery Jumpstart",
    category: "Repair",
    icon: Wrench,
    description: "Provide jumpstart service for dead or weak batteries.",
    serviceFee: 400,
  },
  {
    name: "Towing Service",
    category: "Repair",
    icon: Wrench,
    description:
      "Transport the vehicle to the repair shop in case of immobilization.",
    serviceFee: 1500,
  },
  {
    name: "Air Conditioning Repair",
    category: "Repair",
    icon: Wrench,
    description: "Diagnose and repair the vehicle’s A/C system.",
    serviceFee: 3000,
  },
  {
    name: "Hybrid/Electric Vehicle Service",
    category: "Repair",
    icon: Wrench,
    description:
      "Repair and service tailored for hybrid or electric vehicle systems.",
    serviceFee: 6000,
  },
  {
    name: "Wheel Alignment",
    category: "Repair",
    icon: Wrench,
    description:
      "Adjust the angles of wheels for better handling and tire wear.",
    serviceFee: 1000,
  },

  // ⚙️ Maintenance services
  {
    name: "Oil Change",
    category: "Maintenance",
    icon: Settings,
    description:
      "Replace engine oil and oil filter to ensure smooth engine operation.",
    serviceFee: 1200,
  },
  {
    name: "Tire Rotation",
    category: "Maintenance",
    icon: Settings,
    description: "Rotate tires to promote even tire wear and extend tire life.",
    serviceFee: 800,
  },
  {
    name: "Brake Inspection",
    category: "Maintenance",
    icon: Settings,
    description:
      "Inspect brake pads, rotors, and fluid for safety and performance.",
    serviceFee: 500,
  },
  {
    name: "Battery Check",
    category: "Maintenance",
    icon: Settings,
    description:
      "Test battery health and terminals to avoid unexpected failure.",
    serviceFee: 400,
  },
  {
    name: "Fluid Top-Up",
    category: "Maintenance",
    icon: Settings,
    description:
      "Top up essential vehicle fluids like coolant, brake fluid, and wiper fluid.",
    serviceFee: 600,
  },
  {
    name: "Air Filter Replacement",
    category: "Maintenance",
    icon: Settings,
    description:
      "Replace dirty air filters to ensure proper airflow and engine efficiency.",
    serviceFee: 700,
  },
  {
    name: "20,000 km Service",
    category: "Maintenance",
    icon: Settings,
    description:
      "Comprehensive maintenance based on manufacturer’s guidelines at 20k km.",
    serviceFee: 3000,
  },
  {
    name: "40,000 km Service",
    category: "Maintenance",
    icon: Settings,
    description:
      "Full service including inspection and replacement of major components.",
    serviceFee: 5000,
  },
  {
    name: "Timing Belt Replacement (Scheduled)",
    category: "Maintenance",
    icon: Settings,
    description:
      "Replace the timing belt based on schedule to prevent engine damage.",
    serviceFee: 4500,
  },
];

const inventory: Inventory[] = [
  {
    category: "Product",
    item: "Engine Oil",
    stock: 25,
    price: 185.0,
  },
  {
    category: "Product",
    item: "Coolant",
    stock: 18,
    price: 130.5,
  },
  {
    category: "Product",
    item: "Brake Fluid",
    stock: 12,
    price: 95.75,
  },
  {
    category: "Product",
    item: "Transmission Fluid",
    stock: 20,
    price: 310.0,
  },
  {
    category: "Product",
    item: "Power Steering Fluid",
    stock: 15,
    price: 105.0,
  },
  {
    category: "Part",
    item: "Brake Pads",
    stock: 40,
    price: 650.0,
  },
  {
    category: "Part",
    item: "Spark Plug",
    stock: 60,
    price: 110.25,
  },
  {
    category: "Part",
    item: "Air Filter",
    stock: 30,
    price: 450.0,
  },
  {
    category: "Part",
    item: "Oil Filter",
    stock: 45,
    price: 220.0,
  },
  {
    category: "Part",
    item: "Timing Belt",
    stock: 8,
    price: 1850.5,
  },
];

const FormSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  contact: z.string().min(1, "Contact number is required"),
});

export default function WalkInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      contact: "",
    },
  });
  const [selectedServiceType, setSelectedServiceType] =
    useState<ServiceType>("Repair");
  const [selectedService, setSelectedService] = useState<SelectedService>({
    service_name: "",
    service_fee: 0,
  });
  const [selectedInventory, setSelectedInventory] = useState<
    SelectedInventory[]
  >([]);
  const [isStockEnough, setIsStockEnough] = useState<boolean>(true);

  const handleSelectService = (service_name: string, service_fee: number) => {
    setSelectedService({ service_name, service_fee });
  };

  function isItemSelected(itemIndex: number) {
    return selectedInventory.some(
      (selectedItem) => selectedItem.index === itemIndex
    );
  }

  const handleSelectInventory = (item: InventoryWithIndex) => {
    setSelectedInventory((prev) => {
      const transformedItem = {
        index: item.index,
        category: item.category,
        item: item.item,
        stock: item.stock,
        price: item.price,
        quantity: 1,
        total_price: item.price,
      };

      return [...prev, transformedItem];
    });
  };

  const handleQuantityChange = (itemIndex: number, quantity: number) => {
    setSelectedInventory((prev) =>
      prev.map((item) => {
        if (item.index !== itemIndex) {
          return item;
        }

        if (quantity > item.stock) {
          setIsStockEnough(false);
          return item;
        }

        setIsStockEnough(true);

        return {
          ...item,
          quantity,
          total_price: item.price * quantity,
        };
      })
    );
  };

  const handleRemoveInventory = (itemIndex: number) => {
    setSelectedInventory((prev) =>
      prev.filter((item) => item.index !== itemIndex)
    );
    console.log(selectedInventory);
  };

  const onSubmit = (data: CustomerDetails) => {
    console.log(data);
  };

  return (
    <div>
      {/* stock not enough modal */}
      {!isStockEnough && (
        <div className="fixed z-50 h-screen top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm mx-4 transform transition-all duration-300 scale-100 hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-red-100 rounded-full p-3">
                <PiExclamationMark size={32} className="text-red-600" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Insufficient Stock
              </h3>
              <p className="text-gray-600 mb-6">
                Sorry, we don&apos;t have enough items in stock to fulfill your
                request.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setIsStockEnough(true)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white my-8 rounded-lg border space-y-8 px-4 py-8 max-w-screen-lg mx-auto"
      >
        <h1 className="text-3xl text-center">Walk-In Customer</h1>
        {/* customer details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-muted-foreground">
              Customer Details
            </p>
            <span className="flex-1 block h-[1px] bg-muted"></span>
          </div>

          <div className="space-y-4">
            {/* full name */}
            <div className="grid grid-cols-2 gap-4">
              {/* first name */}
              <div className="grid gap-2">
                <label>First Name</label>
                <Input
                  {...register("firstname")}
                  type="text"
                  className={`${errors.firstname && "ring-2 ring-red-500"}`}
                />
                {errors.firstname && (
                  <p className="text-red-500">{errors.firstname.message}</p>
                )}
              </div>
              {/* last name */}
              <div className="grid gap-2">
                <label>Last Name</label>
                <Input
                  {...register("lastname")}
                  type="text"
                  className={`${errors.lastname && "ring-2 ring-red-500"}`}
                />
                {errors.lastname && (
                  <p className="text-red-500">{errors.lastname.message}</p>
                )}
              </div>
            </div>
            {/* contact */}
            <div className="grid gap-2">
              <label>Contact</label>
              <Input
                {...register("contact")}
                type="number"
                className={`${errors.contact && "ring-2 ring-red-500"}`}
              />
              {errors.contact && (
                <p className="text-red-500">{errors.contact.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* service selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-muted-foreground">
              Service Selection
            </p>
            <span className="flex-1 block h-[1px] bg-muted"></span>
          </div>

          {/* service type */}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            {serviceType.map((service, serviceIndex) => (
              <div
                onClick={() => setSelectedServiceType(service.name)}
                key={serviceIndex}
                className={`${
                  selectedServiceType === service.name && "ring-2 ring-primary"
                } border p-4 rounded-md flex items-center gap-4 cursor-pointer  transition-all hover:scale-102 duration-300 ease-in-out`}
              >
                <service.icon size={25} />
                <p className="font-bold text-lg">{service.name}</p>
              </div>
            ))}
          </div>

          {/* services */}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            {services
              .filter((s) => s.category === selectedServiceType)
              .map((service, serviceIndex) => (
                <div
                  onClick={() =>
                    handleSelectService(service.name, service.serviceFee)
                  }
                  key={serviceIndex}
                  className={`${
                    service.name === selectedService.service_name &&
                    "ring-2 ring-primary"
                  }  transition-all hover:scale-102 duration-300 ease-in-out border p-4 rounded-md flex items-center gap-4 cursor-pointer `}
                >
                  <div className="bg-gray-100 p-4 rounded-full">
                    <service.icon size={25} />
                  </div>

                  <div className="space-y-1">
                    <p className="font-bold text-lg">{service.name}</p>
                    <p className="font-semibold">
                      ₱{service.serviceFee?.toLocaleString()}
                    </p>

                    <p className="leading-[22px] max-w-[300px] text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* inventory selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-muted-foreground">
              Inventory Selection
            </p>
            <span className="flex-1 block h-[1px] bg-muted"></span>
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            {inventory.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className={`border p-4 rounded-md cursor-pointer hover:scale-102 duration-300 ease-in-out flex flex-col gap-2 items-start transition-all`}
              >
                <div className="w-full flex items-center justify-between gap-4">
                  <p
                    className={`${
                      item.category === "Part" ? "bg-green-100" : "bg-blue-100"
                    } font-semibold text-xs rounded-lg px-2 py-1`}
                  >
                    {item.category}
                  </p>

                  {!isItemSelected(itemIndex) ? (
                    <button
                      type="button"
                      onClick={() =>
                        handleSelectInventory({
                          ...item,
                          index: itemIndex,
                        } as InventoryWithIndex)
                      }
                      className="bg-gray-100 p-2 rounded-full cursor-pointer"
                    >
                      <Plus size={15} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleRemoveInventory(itemIndex)}
                      className="bg-gray-100 p-2 rounded-full cursor-pointer"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-4 justify-between w-full">
                  <p className="font-bold text-lg">{item.item}</p>
                  <p className="font-semibold">
                    ₱{item.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-4 justify-between w-full">
                  <p className="flex items-center gap-2">
                    <PackageCheck size={15} /> {item.stock}
                  </p>

                  <input
                    type="number"
                    min={1}
                    defaultValue={1}
                    onChange={(e) =>
                      handleQuantityChange(itemIndex, +e.target.value)
                    }
                    className={`${
                      isItemSelected(itemIndex) ? "block" : "hidden"
                    } border max-w-[80px] px-2 rounded`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* total */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-muted-foreground">Total</p>
            <span className="flex-1 block h-[1px] bg-muted"></span>
          </div>
          <div className="divide-y">
            {selectedInventory.map((inv, idx) => (
              <div key={idx} className="py-2 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{inv.item}</p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {inv.quantity}
                  </p>
                </div>
                <p className="font-semibold ">
                  ₱{inv.total_price.toLocaleString()}
                </p>
              </div>
            ))}
            {/* service fee */}
            {selectedService.service_name && (
              <div className="py-2 flex justify-between">
                <div>
                  <p className="font-semibold">Selected Service</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedService.service_name || "Select Service"}
                  </p>
                </div>
                <p className="font-semibold">
                  ₱{selectedService.service_fee.toLocaleString()}
                </p>
              </div>
            )}

            {/* total */}
            <div className="py-2 flex justify-between">
              <p className="font-semibold">Total</p>
              <p className="font-semibold">
                ₱
                {(
                  selectedService.service_fee +
                  selectedInventory.reduce(
                    (acc, inv) => acc + inv.total_price,
                    0
                  )
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
