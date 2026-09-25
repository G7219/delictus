"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = authGuard;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
/** Protects agent-dashboard endpoints. Expects `Authorization: Bearer <jwt>`. */
function authGuard(req, res, next) {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Missing bearer token" });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(header.slice(7), env_1.env.JWT_SECRET);
        req.agent = payload;
        next();
    }
    catch {
        res.status(401).json({ error: "Invalid or expired token" });
    }
}
