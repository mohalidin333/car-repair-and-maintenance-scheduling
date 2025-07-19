import { InventoryType } from "./inventory-type";

export type ServiceType = {
  service_type: string;
  service: string;
  service_fee: number;
  inventory: InventoryType;
};
