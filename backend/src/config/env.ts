import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  REDIS_URL: z.string().min(1, "REDIS_URL is required"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET should be at least 32 characters"),
  ENCRYPTION_KEY: z
    .string()
    .length(64, "ENCRYPTION_KEY must be a 64-character hex string — generate with `openssl rand -hex 32`"),
  META_VERIFY_TOKEN: z.string().optional(),
});

// Fails fast on boot if any required var is missing/malformed, instead of
// surfacing as a confusing runtime error the first time it's touched.
export const env = envSchema.parse(process.env);
