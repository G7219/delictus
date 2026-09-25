import { Request, Response, NextFunction } from "express";

/**
 * Hard lock: blocks dashboard/API access until a broker's one-time setup
 * fee (1M–5M TZS) is paid. Run this after authGuard so req.agent.tenantId
 * (or req.tenant, on tenant-resolved routes) is already available.
 */
export function setupFeeGuard(req: Request, res: Response, next: NextFunction) {
  if (!req.tenant?.setupFeePaid) {
    return res.status(402).json({ error: "Setup fee not yet paid — access locked" });
  }
  next();
}
