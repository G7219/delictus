"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    const tenant = await prisma.tenant.create({
        data: {
            companyName: "Demo Stockbrokers Ltd",
            slug: "demo-stockbrokers",
            subscriptionPlan: "STARTER",
        },
    });
    await prisma.agent.create({
        data: {
            tenantId: tenant.id,
            email: "admin@demo-stockbrokers.co.tz",
            name: "Demo Admin",
            role: "ADMIN",
            passwordHash: await bcryptjs_1.default.hash("changeme123", 10),
        },
    });
    console.log(`Seeded tenant "${tenant.slug}" with one admin agent (admin@demo-stockbrokers.co.tz / changeme123)`);
}
main()
    .catch((err) => {
    console.error(err);
    process.exit(1);
})
    .finally(() => prisma.$disconnect());
