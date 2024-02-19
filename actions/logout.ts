"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  //do some stuff while loggoing out user
  await signOut();
};
