import { z } from "zod";

export const AppointmentSchema = z.object({
  firstname: z.string().min(1, "Firstname is required"),
  lastname: z.string().min(1, "Lastname is required"),
  contact: z.coerce
    .string()
    .min(11, "Contact must be length of 11 digits")
    .max(11, "Contact must be length of 11 digits"),
  address: z.string().min(1, "Address is required"),
  car_name: z.string().min(1, "Car name is required"),
  plate_number: z.string(),
  issue_description: z.string().min(1, "Issue description is required"),
});
