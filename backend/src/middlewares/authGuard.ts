import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

/** Protects agent-dashboard endpoints. Expects `Authorization: Bearer <jwt>`. */
export function authGuard(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing bearer token" });
  }
  try {
    const payload = jwt.verify(header.slice(7), env.JWT_SECRET) as {
      id: string;
      tenantId: string;
      role: string;
    };
    req.agent = payload;
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
