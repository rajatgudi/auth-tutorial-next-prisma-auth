import { PrismaClient } from "@prisma/client";
//
declare global {
  var prisma: PrismaClient | undefined;
}
//because of next js hot reload instead of creating new client everytime reusing existing one
//there will be error with too many active prisma cleints
export const db = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
