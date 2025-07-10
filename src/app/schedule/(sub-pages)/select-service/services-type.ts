import { LucideIcon } from "lucide-react";
import { ServiceType } from "./page";

export type Services = {
  name: string;
  category: ServiceType;
  icon: LucideIcon;
  description: string;
  serviceFee: number;
};
