import { z } from "zod";

export const PaymentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  number: z.coerce.string().min(11, "Number is required"),
});
