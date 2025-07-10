import { ArrowLeft, Settings, Wrench } from "lucide-react";
import Link from "next/link";
import React from "react";

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

export default function ServiceTypeComponent({
  selectedServiceType,
  handleSelectServiceType,
}: {
  selectedServiceType: string;
  handleSelectServiceType: (serviceType: "Repair" | "Maintenance") => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl">Service Type</h1>
        <Link
          href={"/schedule/appointment"}
          className="btn-outline flex items-center gap-2"
        >
          <ArrowLeft size={15} />
          Back
        </Link>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {serviceType.map((service, serviceIndex) => (
          <div
            onClick={() => handleSelectServiceType(service.name)}
            key={serviceIndex}
            className={`${
              service.name === selectedServiceType && "ring-2 ring-primary"
            } border p-4 rounded-md flex items-center gap-4 cursor-pointer  transition-all hover:scale-102 duration-300 ease-in-out`}
          >
            <service.icon size={25} />
            <p className="font-bold text-lg">{service.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
