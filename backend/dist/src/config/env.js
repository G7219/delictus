"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(["development", "production", "test"]).default("development"),
    PORT: zod_1.z.coerce.number().default(4000),
    DATABASE_URL: zod_1.z.string().min(1, "DATABASE_URL is required"),
    REDIS_URL: zod_1.z.string().min(1, "REDIS_URL is required"),
    JWT_SECRET: zod_1.z.string().min(32, "JWT_SECRET should be at least 32 characters"),
    ENCRYPTION_KEY: zod_1.z
        .string()
        .length(64, "ENCRYPTION_KEY must be a 64-character hex string — generate with `openssl rand -hex 32`"),
    META_VERIFY_TOKEN: zod_1.z.string().optional(),
});
// Fails fast on boot if any required var is missing/malformed, instead of
// surfacing as a confusing runtime error the first time it's touched.
exports.env = envSchema.parse(process.env);
