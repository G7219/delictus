"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const ioredis_1 = __importDefault(require("ioredis"));
const env_1 = require("./env");
exports.prisma = new client_1.PrismaClient({
    log: env_1.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
});
exports.redis = new ioredis_1.default(env_1.env.REDIS_URL);
