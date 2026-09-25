import crypto from "crypto";
import { env } from "../config/env";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12; // recommended nonce size for GCM

function getKey(): Buffer {
  return Buffer.from(env.ENCRYPTION_KEY, "hex");
}

/**
 * Encrypts a tenant secret (WhatsApp access token, broker core API key)
 * before it's written to the database. Never store these fields in
 * plaintext — a DB dump/leak would otherwise hand over every broker's
 * live WhatsApp and core-banking credentials at once.
 */
export function encrypt(plainText: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return [iv.toString("base64"), authTag.toString("base64"), ciphertext.toString("base64")].join(":");
}

/** Decrypts a value previously produced by encrypt(). */
export function decrypt(payload: string): string {
  const [ivB64, authTagB64, dataB64] = payload.split(":");
  if (!ivB64 || !authTagB64 || !dataB64) {
    throw new Error("Malformed encrypted payload");
  }
  const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), Buffer.from(ivB64, "base64"));
  decipher.setAuthTag(Buffer.from(authTagB64, "base64"));
  const plaintext = Buffer.concat([decipher.update(Buffer.from(dataB64, "base64")), decipher.final()]);
  return plaintext.toString("utf8");
}
