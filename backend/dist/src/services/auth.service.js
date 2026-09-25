"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestOtp = requestOtp;
exports.verifyOtp = verifyOtp;
const crypto_1 = __importDefault(require("crypto"));
const database_1 = require("../config/database");
const OTP_TTL_SECONDS = 5 * 60;
/**
 * Generates a 6-digit OTP for a customer and stores it in Redis for 5
 * minutes. This gates every balance/portfolio read — see the "two-step
 * trade authorization" pattern this extends to once order entry exists.
 */
async function requestOtp(tenantId, customerPhone) {
    const code = crypto_1.default.randomInt(100000, 999999).toString();
    await database_1.redis.set(`otp:${tenantId}:${customerPhone}`, code, "EX", OTP_TTL_SECONDS);
    // TODO: deliver `code` via whatsapp.service. Log the AuditLog event
    // "OTP_REQUESTED" at the call site — never log the code itself.
    return code;
}
async function verifyOtp(tenantId, customerPhone, submitted) {
    const key = `otp:${tenantId}:${customerPhone}`;
    const stored = await database_1.redis.get(key);
    if (!stored || stored !== submitted)
        return false;
    await database_1.redis.del(key);
    return true;
}
