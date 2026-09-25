"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = encrypt;
exports.decrypt = decrypt;
const crypto_1 = __importDefault(require("crypto"));
const env_1 = require("../config/env");
const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12; // recommended nonce size for GCM
function getKey() {
    return Buffer.from(env_1.env.ENCRYPTION_KEY, "hex");
}
/**
 * Encrypts a tenant secret (WhatsApp access token, broker core API key)
 * before it's written to the database. Never store these fields in
 * plaintext — a DB dump/leak would otherwise hand over every broker's
 * live WhatsApp and core-banking credentials at once.
 */
function encrypt(plainText) {
    const iv = crypto_1.default.randomBytes(IV_LENGTH);
    const cipher = crypto_1.default.createCipheriv(ALGORITHM, getKey(), iv);
    const ciphertext = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
    const authTag = cipher.getAuthTag();
    return [iv.toString("base64"), authTag.toString("base64"), ciphertext.toString("base64")].join(":");
}
/** Decrypts a value previously produced by encrypt(). */
function decrypt(payload) {
    const [ivB64, authTagB64, dataB64] = payload.split(":");
    if (!ivB64 || !authTagB64 || !dataB64) {
        throw new Error("Malformed encrypted payload");
    }
    const decipher = crypto_1.default.createDecipheriv(ALGORITHM, getKey(), Buffer.from(ivB64, "base64"));
    decipher.setAuthTag(Buffer.from(authTagB64, "base64"));
    const plaintext = Buffer.concat([decipher.update(Buffer.from(dataB64, "base64")), decipher.final()]);
    return plaintext.toString("utf8");
}
