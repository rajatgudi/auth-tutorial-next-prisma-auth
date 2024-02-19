import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  //expires in one hour from now
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  //check if there is token exist , if exist replace it with new one
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      expires,
      token,
    },
  });
  return verificationToken;
};
