"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import IndicatorComponent from "./indicator-component";
import StockNotEnoughModalComponent from "./stock-not-enough-modal-component";
import ServiceTypeComponent from "./service-type-component";
import { SelectedService } from "./selected-service-type";
import ServicesComponent from "./services-component";
import { SelectedInventory } from "./selected-inventory-type";
import { InventoryWithIndex } from "./inventory-with-index-type";
import InventoryComponent from "./inventory-component";

export type ServiceType = "Repair" | "Maintenance";
export type Category = "Product" | "Part";

export default function SelectServicePage() {
  const [selectedServiceType, setSelectedServiceType] =
    useState<ServiceType>("Repair");
  const [selectedService, setSelectedService] = useState<SelectedService>({
    name: "",
    service_fee: 0,
  });
  const [selectedInventory, setSelectedInventory] = useState<
    SelectedInventory[]
  >([]);
  const [isStockEnough, setIsStockEnough] = useState<boolean>(true);
  const router = useRouter();

  const handleSelectServiceType = (serviceType: ServiceType) => {
    setSelectedServiceType(serviceType);
  };

  const handleSelectService = (name: string, service_fee: number) => {
    setSelectedService({ name, service_fee });
  };

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

  const handleRemoveInventory = (itemIndex: number) => {
    setSelectedInventory((prev) =>
      prev.filter((item) => item.index !== itemIndex)
    );
    console.log(selectedInventory);
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

  function isItemSelected(itemIndex: number) {
    return selectedInventory.some(
      (selectedItem) => selectedItem.index === itemIndex
    );
  }

  const handleNext = () => {
    localStorage.setItem(
      "appointment_service",
      JSON.stringify({
        service_type: selectedServiceType,
        service: selectedService.name,
        service_fee: selectedService.service_fee,
        inventory: selectedInventory,
      })
    );

    router.push("/schedule/appointment-details");
  };

  function getServiceDetails() {
    const serviceDetails = localStorage.getItem("appointment_service");
    if (serviceDetails) {
      const parsedServiceDetails = JSON.parse(serviceDetails);
      setSelectedServiceType(parsedServiceDetails.service_type);
      setSelectedService({
        name: parsedServiceDetails.service,
        service_fee: parsedServiceDetails.service_fee,
      });
      setSelectedInventory(parsedServiceDetails.inventory);
    }
  }

  useEffect(() => {
    getServiceDetails();
  }, []);

  return (
    <div className="space-y-8 px-4 py-8 max-w-screen-lg mx-auto">
      {/* stock not enough modal */}
      {!isStockEnough && (
        <StockNotEnoughModalComponent setIsStockEnough={setIsStockEnough} />
      )}

      <h1 className="text-center text-3xl">Select Service</h1>

      {/* indicator */}
      <IndicatorComponent />

      {/* service type */}
      <ServiceTypeComponent
        handleSelectServiceType={handleSelectServiceType}
        selectedServiceType={selectedServiceType}
      />

      {/* services */}
      <ServicesComponent
        handleSelectService={handleSelectService}
        selectedServiceType={selectedServiceType}
        selectedService={selectedService}
      />

      {/* inventory */}
      <InventoryComponent
        isItemSelected={isItemSelected}
        handleSelectInventory={handleSelectInventory}
        handleRemoveInventory={handleRemoveInventory}
        handleQuantityChange={handleQuantityChange}
      />
      {/* next button */}
      <div className="flex justify-end">
        <Button onClick={handleNext} className="btn">
          Next
          <ArrowRight size={15} />
        </Button>
      </div>
    </div>
  );
}
