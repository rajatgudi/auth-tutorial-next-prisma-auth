"use server";
import { LoginSchema, RegisterSchema } from "@/schemas";
import * as z from "zod";
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const isValidatedFields = LoginSchema.safeParse(values);

  if (!isValidatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  console.log("login", values);
  return { success: "Email Sent" };
};
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const isValidatedFields = RegisterSchema.safeParse(values);
  if (!isValidatedFields.success) {
    return { error: "Invalid Fields!" };
  }
  console.log("Register", values);
  return { success: "Email Sent" };
};
