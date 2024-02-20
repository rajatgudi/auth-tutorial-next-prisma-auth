import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "@/auth.config";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { getAccontbyUserId } from "./data/account";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    //updating email verified to current datetime when login by google/github
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      //Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;
      //@ts-ignore
      const existingUser = await getUserById(user?.id);

      //Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;
      return true;
    },
    //extracting id from token and adding to session object
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      //fetch user Role from token and store in session
      if (token.role && session.user) {
        //@ts-ignore
        session.user.role = token.role;
      }
      if (session.user) {
        session.user.name = token.name;
        //@ts-ignore
        session.user.email = token.email;
          //@ts-ignore
        session.user.role = token.role;
        //gets isOath from jwt token
        session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }
      //store user Role from DB ans store in token
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      //checks whether its associated account, i.e checks if user logged in from google / git
      const existingAccount = await getAccontbyUserId(existingUser.id);
      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
