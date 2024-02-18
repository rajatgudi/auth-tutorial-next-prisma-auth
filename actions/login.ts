"use server";
import { LoginSchema, RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcryptjs from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const isValidatedFields = LoginSchema.safeParse(values);

  if (!isValidatedFields.success) {
    return { error: "Invalid Fields!" };
  }
  const { email, password } = isValidatedFields.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    // else it wont redirect
    throw error
  }
  return { success: "Email Sent" };
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const isValidatedFields = RegisterSchema.safeParse(values);
  if (!isValidatedFields.success) {
    return { error: "Invalid Fields!" };
  }
  console.log("Register", values);
  const { email, name, password } = isValidatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Email already exists!" };
  }

  const hashedPassword = await bcryptjs.hash(password, 10);
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  // Send verification
  return { success: "User Created!" };
};
