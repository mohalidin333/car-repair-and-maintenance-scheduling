import { LucideIcon, Settings, Wrench } from "lucide-react";

export type ServiceType = "Repair" | "Maintenance";

export type Services = {
  name: string;
  category: ServiceType;
  icon: LucideIcon;
  description: string;
  serviceFee: number;
};

export const serviceType = [
  {
    name: "Repair",
    icon: Wrench,
  },
  {
    name: "Maintenance",
    icon: Settings,
  },
] as const;