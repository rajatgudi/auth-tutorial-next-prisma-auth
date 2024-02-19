import * as z from "zod";
export const LoginSchema = z.object({
  email: z.string().email("Invalid Email!"),
  password: z.string().min(6, "Minimum 6 characters required!"),
});

export const RegisterSchema = z.object({
  email: z.string().email("Invalid Email!"),
  password: z.string().min(6, "Minimum 6 characters required!"),
  name: z.string().min(2, {
    message: "Name is Required, minimum 2 characters!",
  }),
});
export const ResetSchema = z.object({
  email: z.string().email("Invalid Email!"),
});
export const NewPasswordSchema = z.object({
  password: z.string().min(6, "Minimum 6 characters required!"),
});
