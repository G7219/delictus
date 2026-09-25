import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../config/database";
import { env } from "../config/env";

/** Agent dashboard login — email + password, returns a JWT. */
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const agent = await prisma.agent.findUnique({ where: { email } });

    if (!agent || !(await bcrypt.compare(password, agent.passwordHash))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // TODO: MFA step before issuing the token — mirrors the customer-facing
    // "two-step authorization" pattern, for the same reason: this account
    // can see live financial data.
    const token = jwt.sign(
      { id: agent.id, tenantId: agent.tenantId, role: agent.role },
      env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token, agent: { id: agent.id, name: agent.name, role: agent.role } });
  } catch (err) {
    next(err);
  }
}
