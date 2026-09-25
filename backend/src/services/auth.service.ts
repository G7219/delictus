import crypto from "crypto";
import { redis } from "../config/database";

const OTP_TTL_SECONDS = 5 * 60;

/**
 * Generates a 6-digit OTP for a customer and stores it in Redis for 5
 * minutes. This gates every balance/portfolio read — see the "two-step
 * trade authorization" pattern this extends to once order entry exists.
 */
export async function requestOtp(tenantId: string, customerPhone: string): Promise<string> {
  const code = crypto.randomInt(100000, 999999).toString();
  await redis.set(`otp:${tenantId}:${customerPhone}`, code, "EX", OTP_TTL_SECONDS);
  // TODO: deliver `code` via whatsapp.service. Log the AuditLog event
  // "OTP_REQUESTED" at the call site — never log the code itself.
  return code;
}

export async function verifyOtp(tenantId: string, customerPhone: string, submitted: string): Promise<boolean> {
  const key = `otp:${tenantId}:${customerPhone}`;
  const stored = await redis.get(key);
  if (!stored || stored !== submitted) return false;
  await redis.del(key);
  return true;
}
