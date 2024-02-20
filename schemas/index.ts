import { UserRole } from "@prisma/client";
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
export const SettingsSchema = z
  .object({
    name: z.string().min(2, "Minimum 2 characters required!"),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email("Invalid Email")),
    password: z.optional(z.string().min(6)),
    newpassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newpassword) {
        return false;
      }
      if (data.newpassword && !data.password) {
        return false;
      }
      return true;
    },
    { message: "New Password is required!", path: ["newpassword"] }
  )
  .refine(
    (data) => {
      if (data.password && !data.newpassword) {
        return false;
      }
      if (data.newpassword && !data.password) {
        return false;
      }
      return true;
    },
    { message: "Password is required!", path: ["password"] }
  );
