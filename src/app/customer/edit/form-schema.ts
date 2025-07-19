import { z } from "zod";

export const FormSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  contact: z.string().min(1, "Contact number is required"),
  address: z.string().min(1, "Address is required"),
  car_name: z.string().min(1, "Car name is required"),
  plate_number: z.string().min(1, "Last name is required"),
  issue_description: z.string().min(1, "Issue Description is required"),
});