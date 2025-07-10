import { SelectedInventory } from "../select-service/selected-inventory-type";

export type Service = {
  service_type: string;
  service: string;
  service_fee: number;
  inventory_selection: number;
  inventory: SelectedInventory[];
};
