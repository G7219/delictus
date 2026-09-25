import { PrismaClient } from "@prisma/client";
import Redis from "ioredis";
import { env } from "./env";

export const prisma = new PrismaClient({
  log: env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
});

export const redis = new Redis(env.REDIS_URL);
