import { PrismaClient } from "@prisma/client/extension";

// This tells TypeScript that 'prisma' might exist on the global object
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// 1. Check if we already have a prisma instance. If not, create one.
export const db = globalForPrisma.prisma || new PrismaClient();

// 2. If we are NOT in production, save the instance to the global object 
// so it survives across hot-reloads.
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
