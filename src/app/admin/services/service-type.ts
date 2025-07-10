export type ServiceType =  {
  id: number;
  service_type: "Repair" | "Maintenance";
  service_name: string;
  service_fee: number;
  description: string;
  created_at: string;
}

export type ServiceFieldsType = {
  label: string;
  name: "service_type" | "service_name" | "service_fee" | "service_description"
  type: string;
  options?: string[];
};
  