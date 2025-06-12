import z from "zod";

export const ForgotSchema = z.object({
  email: z.string().email("Invalid email"),
});
