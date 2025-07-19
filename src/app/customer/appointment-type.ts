import { InventoryType } from "./inventory-type";
import { ServiceType } from "./service-type";

export type AppointmentType = {
  id: number;
  user_id: string;
  firstname: string;
  lastname: string;
  contact: string;
  address: string;
  car_name: string;
  plate_number: string;
  issue_description: string;
  car_images: string[];
  schedule: string;
  service_type: string;
  service_name: string;
  service: ServiceType;
  service_fee: number;
  inventory: InventoryType;
  inventory_fee: number;
  total_fee: number;
  appointment_type: string;
  status: string;
  follow_up_for: string;
  follow_up_date: string;
  created_at: string;
  is_paid: string
};