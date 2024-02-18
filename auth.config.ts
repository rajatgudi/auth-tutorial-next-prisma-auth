import GitHub from "next-auth/providers/github";
import LinkedIn from "next-auth/providers/linkedin";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema, RegisterSchema } from "@/schemas";
import { getUserByEmail } from "./data/user";
import bcryptjs from "bcryptjs";
export default {
  providers: [
    Credentials({
      async authorize(credentials, request) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);

          //if created account git / google
          if (!user || !user.password) return null;

          const passwordMatch = await bcryptjs.compare(password, user.password);

          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
