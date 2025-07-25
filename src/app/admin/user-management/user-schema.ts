import z from "zod";

export const UserSchema = z.object({
  role: z.enum(["admin", "user"]),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  password: z.string(),
});
