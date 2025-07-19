"use client";

import React, { useEffect, useState } from "react";
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
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

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

const FormSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  contact: z.string().min(1, "Contact number is required"),
});

export default function WalkInPage() {
  const [services, setServices] = useState<Services[]>([]);
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const supabase = createClient();
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

  const onSubmit = async (data: CustomerDetails) => {
    try {
      // Calculate inventory fee
      const inventory_fee = selectedInventory.reduce(
        (total, item) => total + item.total_price,
        0
      );

      // Calculate total fee
      const total_fee = selectedService.service_fee + inventory_fee;

      // Prepare the appointment data
      const appointmentData = {
        firstname: data.firstname,
        lastname: data.lastname,
        address: "",
        car_name: "",
        plate_number: "",
        issue_description: "",
        schedule: "",
        car_images: [],
        service: [],
        follow_up_date: "",
        follow_up_for: "",
        contact: data.contact,
        service_type: selectedServiceType,
        service_name: selectedService.service_name,
        service_fee: selectedService.service_fee,
        inventory: selectedInventory,
        inventory_fee,
        total_fee,
        status: "Pending",
        appointment_type: "Walk-in",
        is_paid: "Unpaid",
      };

      // Insert the appointment into Supabase
      const { error } = await supabase
        .from("appointments")
        .insert(appointmentData);

      if (error) {
        throw error;
      }

      // Update inventory stock levels
      await updateInventoryStock();

      // Show success message
      toast.success("Appointment created successfully!");

      // Reset form
      setSelectedService({ service_name: "", service_fee: 0 });
      setSelectedInventory([]);
      // You might want to add a form reset here if needed
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast.error(`Failed to create appointment: ${(error as Error).message}`);
    }
  };

  const updateInventoryStock = async () => {
    try {
      // Create a transaction to update all inventory items
      const updates = selectedInventory.map((item) =>
        supabase
          .from("inventory")
          .update({ stock: item.stock - item.quantity })
          .eq("item_name", item.item)
      );

      // Execute all updates
      const results = await Promise.all(updates);

      // Check for errors
      results.forEach((result) => {
        if (result.error) {
          throw result.error;
        }
      });
    } catch (error) {
      console.error("Error updating inventory:", error);
      toast.error("Failed to update inventory stock levels");
      // You might want to handle this error differently
    }
  };
  // Fetch services from Supabase
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase.from("services").select("*");

        if (error) throw error;

        if (data) {
          const formattedServices = data.map((service) => ({
            name: service?.service_name,
            category: service.service_type,
            icon: service.service_type === "Repair" ? Wrench : Settings,
            description: service.description,
            serviceFee: service.service_fee,
          }));
          setServices(formattedServices);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        toast.error("Failed to load services");
      }
    };

    fetchServices();
  }, [supabase]);

  // Fetch inventory from Supabase
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const { data, error } = await supabase.from("inventory").select("*");

        if (error) throw error;

        if (data) {
          const formattedInventory = data.map((item) => ({
            category: item.category,
            item: item.item_name,
            stock: item.stock,
            price: item.unit_price,
          }));
          setInventory(formattedInventory);
        }
      } catch (error) {
        console.error("Error fetching inventory:", error);
        toast.error("Failed to load inventory");
      }
    };

    fetchInventory();
  }, [supabase]);

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
