"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./middlewares/errorHandler");
const webhook_routes_1 = __importDefault(require("./routes/webhook.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const tenant_routes_1 = __importDefault(require("./routes/tenant.routes"));
const billing_routes_1 = __importDefault(require("./routes/billing.routes"));
const broker_routes_1 = __importDefault(require("./routes/broker.routes"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.get("/health", (_req, res) => res.json({ status: "ok" }));
exports.app.use("/v1/whatsapp/webhook", webhook_routes_1.default);
exports.app.use("/v1/auth", auth_routes_1.default);
exports.app.use("/v1/tenant", tenant_routes_1.default);
exports.app.use("/v1/billing", billing_routes_1.default);
exports.app.use("/v1/broker", broker_routes_1.default);
// Keep last — converts thrown/next(err) errors into a JSON response.
exports.app.use(errorHandler_1.errorHandler);
