"use server";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { SettingsSchema } from "@/schemas";
import * as z from "zod";
import bcryptjs from "bcryptjs";
export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized!" };
  }
  //@ts-ignore
  const dbUser = await getUserById(user?.id);
  if (!dbUser) {
    return { error: "Unauthorized!" };
  }
  if (user.isOAuth) {
    values.email = undefined;
    values.newpassword = undefined;
    values.password = undefined;
  }
  //If user changes  email
  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Verification Email Sent!" };
  }
  if (values.password && values.newpassword && dbUser.password) {
    const passwordMatch = await bcryptjs.compare(
      values.password,
      dbUser.password
    );
    if (!passwordMatch) {
      return { error: "Incorrect Password" };
    }

    const hashedPassword = await bcryptjs.hash(values.newpassword, 10);
    values.password = hashedPassword;
    values.newpassword = undefined;
  }
  await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...values,
    },
  });
  return { success: "Settings Updated!" };
};
