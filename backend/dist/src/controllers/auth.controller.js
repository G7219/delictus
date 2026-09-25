"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = require("../config/database");
const env_1 = require("../config/env");
/** Agent dashboard login — email + password, returns a JWT. */
async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const agent = await database_1.prisma.agent.findUnique({ where: { email } });
        if (!agent || !(await bcryptjs_1.default.compare(password, agent.passwordHash))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        // TODO: MFA step before issuing the token — mirrors the customer-facing
        // "two-step authorization" pattern, for the same reason: this account
        // can see live financial data.
        const token = jsonwebtoken_1.default.sign({ id: agent.id, tenantId: agent.tenantId, role: agent.role }, env_1.env.JWT_SECRET, { expiresIn: "8h" });
        res.json({ token, agent: { id: agent.id, name: agent.name, role: agent.role } });
    }
    catch (err) {
        next(err);
    }
}
