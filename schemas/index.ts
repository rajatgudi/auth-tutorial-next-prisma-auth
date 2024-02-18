import * as z from "zod";
export const LoginSchema = z.object({
  email: z.string().email("Invalid Email!"),
  password: z.string().min(6, "Password should contains more than 6 chars"),
});
