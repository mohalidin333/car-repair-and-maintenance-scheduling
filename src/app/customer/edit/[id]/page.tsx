"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  PackageCheck,
  Plus,
  Settings,
  Wrench,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import StockNotEnoughModalComponent from "@/app/schedule/(sub-pages)/select-service/stock-not-enough-modal-component";
import { serviceType, ServiceType } from "../service-type";
import { InventoryWithIndex } from "../category-type";
import { SelectedService } from "../selected-service-type";
import { SelectedInventory } from "../selected-inventory-type";
import { FormSchema } from "../form-schema";
import ScheduleCalendarComponent from "../schedule-calendar-component";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Services } from "../service-type";
import { Inventory } from "../category-type";

export type CustomerDetails = {
  firstname: string;
  lastname: string;
  contact: string;
  address: string;
  car_name: string;
  plate_number: string;
  issue_description: string;
};

export default function WalkInPage() {
  const [isStockEnough, setIsStockEnough] = useState<boolean>(true);
  const [selectedServiceType, setSelectedServiceType] =
    useState<ServiceType>("Repair");
  const [selectedService, setSelectedService] = useState<SelectedService>({
    service_name: "",
    service_fee: 0,
  });
  const [selectedInventory, setSelectedInventory] = useState<
    SelectedInventory[]
  >([]);
  const [time, setTime] = useState<string>("");
  const router = useRouter();
  const params = useParams();
  const [services, setServices] = useState<Services[]>([]);
  const [inventory, setInventory] = useState<Inventory[]>([]);

  // use form
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      contact: "",
      address: "",
      car_name: "",
      plate_number: "",
      issue_description: "",
    },
  });

  // service selection handler
  const handleSelectService = (service_name: string, service_fee: number) => {
    setSelectedService({ service_name, service_fee });
  };

  // inventory selection handler
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

  // quantity change handler
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

  // inventory remove handler
  const handleRemoveInventory = (itemIndex: number) => {
    setSelectedInventory((prev) =>
      prev.filter((item) => item.index !== itemIndex)
    );
    console.log(selectedInventory);
  };

  // save edit handler
  // save edit handler
  const onSubmit = async (data: CustomerDetails) => {
    try {
      const supabase = createClient();

      // Calculate inventory fee
      const inventory_fee = selectedInventory.reduce(
        (total, item) => total + item.total_price,
        0
      );

      // Prepare the update data
      const updateData = {
        firstname: data.firstname,
        lastname: data.lastname,
        contact: data.contact,
        address: data.address,
        car_name: data.car_name,
        plate_number: data.plate_number,
        issue_description: data.issue_description,
        schedule: time,
        service_type: selectedServiceType,
        service_name: selectedService.service_name,
        service_fee: selectedService.service_fee,
        inventory: selectedInventory,
        inventory_fee,
        total_fee: selectedService.service_fee + inventory_fee,
      };

      // Update the appointment in Supabase
      const { error } = await supabase
        .from("appointments")
        .update(updateData)
        .eq("id", params?.id);

      if (error) {
        throw error;
      }

      // Show success message
      toast.success("Appointment updated successfully!");

      // Redirect back to customer dashboard
      router.push("/customer");
    } catch (error) {
      toast.error(`Failed to update appointment: ${(error as Error).message}`);
      console.error("Error updating appointment:", error);
    }
  };

  useEffect(() => {
    const getAppointment = async () => {
      const { data: appointment } = await createClient()
        .from("appointments")
        .select("*")
        .eq("id", params?.id)
        .single();

      if (appointment) {
        // Set schedule time
        setTime(appointment.schedule);

        // Set personal details
        reset({
          firstname: appointment.firstname,
          lastname: appointment.lastname,
          contact: appointment.contact,
          address: appointment.address,
          car_name: appointment.car_name,
          plate_number: appointment.plate_number,
          issue_description: appointment.issue_description,
        });

        // Set service type and selected service
        setSelectedServiceType(appointment.service_type as ServiceType);
        setSelectedService({
          service_name: appointment.service_name,
          service_fee: appointment.service_fee,
        });

        // Parse and set inventory
        let parsedInventory: InventoryWithIndex[] = [];
        try {
          parsedInventory =
            typeof appointment.inventory === "string"
              ? JSON.parse(appointment.inventory)
              : appointment.inventory;

          // Add index to each inventory item
          const inventoryWithIndex = parsedInventory.map(
            (item: any, index: number) => ({
              ...item,
              index,
              quantity: item.quantity || 1,
              total_price:
                item.total_price || item.price * (item.quantity || 1),
            })
          );

          setSelectedInventory(inventoryWithIndex);
        } catch (e) {
          console.error("Error parsing inventory:", e);
        }
      }
    };
    getAppointment();
  }, [params?.id, reset]);

  const supabase = createClient();

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
      <div className="max-w-screen-lg mx-auto flex justify-end pt-8">
        <Button onClick={() => router.push("/customer")} variant={"outline"}>
          <ArrowLeft size={15} />
          Dashboard
        </Button>
      </div>

      {/* schedule / personal / service / inventory */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white my-8 rounded-lg border space-y-8 px-4 py-8 max-w-screen-lg mx-auto"
      >
        <h1 className="text-3xl text-center">Edit Appointment</h1>

        <div className="space-y-8">
          <ScheduleCalendarComponent
            onSubmit={(schedule) => setTime(schedule)}
          />
          {time && (
            <p className="font-semibold text-muted-foreground">
              Selected Schedule: {time}
            </p>
          )}
        </div>

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
            {/* address */}
            <div className="grid gap-2">
              <label>Address</label>
              <Input
                {...register("address")}
                type="text"
                className={`${errors.address && "ring-2 ring-red-500"}`}
              />
              {errors.address && (
                <p className="text-red-500">{errors.address.message}</p>
              )}
            </div>
            {/* car name */}
            <div className="grid gap-2">
              <label>Car Name</label>
              <Input
                {...register("car_name")}
                type="text"
                className={`${errors.car_name && "ring-2 ring-red-500"}`}
              />
              {errors.car_name && (
                <p className="text-red-500">{errors.car_name.message}</p>
              )}
            </div>
            {/* plate number */}
            <div className="grid gap-2">
              <label>Plate Number</label>
              <Input
                {...register("plate_number")}
                type="text"
                className={`${errors.plate_number && "ring-2 ring-red-500"}`}
              />
              {errors.plate_number && (
                <p className="text-red-500">{errors.plate_number.message}</p>
              )}
            </div>
            {/* issue description */}
            <div className="grid gap-2">
              <label>Issue Description</label>
              <Textarea
                {...register("issue_description")}
                className={`${
                  errors.issue_description && "ring-2 ring-red-500"
                }`}
              />
              {errors.issue_description && (
                <p className="text-red-500">
                  {errors.issue_description.message}
                </p>
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

                  {!isItemSelected(itemIndex, selectedInventory) ? (
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
                      isItemSelected(itemIndex, selectedInventory)
                        ? "block"
                        : "hidden"
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

      {/* stock not enough modal */}
      {!isStockEnough && (
        <StockNotEnoughModalComponent setIsStockEnough={setIsStockEnough} />
      )}
    </div>
  );
}

// check item is already selected
function isItemSelected(
  itemIndex: number,
  selectedInventory: SelectedInventory[]
) {
  return selectedInventory.some(
    (selectedItem) => selectedItem.index === itemIndex
  );
}
