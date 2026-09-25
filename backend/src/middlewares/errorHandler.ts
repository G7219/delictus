import { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger";

// Keep this registered LAST in app.ts — Express only routes to it when a
// handler calls next(err) or throws inside an async wrapper.
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  const message = err instanceof Error ? err.message : "Unknown error";
  logger.error("Unhandled error", { message });
  res.status(500).json({ error: "Internal server error" });
}
