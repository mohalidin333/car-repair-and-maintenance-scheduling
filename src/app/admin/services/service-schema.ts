import z from "zod";

export const ServiceSchema = z.object({
  service_type: z.enum(["Repair", "Maintenance"]),
  service_name: z.string().min(1, "Service name is required"),
  service_fee: z.coerce.string().min(1, "Service fee is required"),
  description: z.string().min(1, "Service description is required"),
});
