import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

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
      passwordHash: await bcrypt.hash("changeme123", 10),
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
