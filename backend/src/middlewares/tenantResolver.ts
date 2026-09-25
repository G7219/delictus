import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/database";

/**
 * Resolves which broker (Tenant) an inbound request belongs to, and
 * attaches it as req.tenant. This is the crux of multi-tenancy: every
 * route that touches customer or broker data must run behind this.
 *
 * WhatsApp webhook payloads carry the *receiving* number's phone_number_id
 * — that's how we know which broker a customer messaged. Internal calls
 * (e.g. the read-only broker balance route) fall back to an x-tenant-id
 * header set by an already-authenticated caller.
 */
export async function tenantResolver(req: Request, res: Response, next: NextFunction) {
  try {
    const phoneNumberId =
      req.body?.entry?.[0]?.changes?.[0]?.value?.metadata?.phone_number_id ??
      req.headers["x-tenant-id"];

    if (!phoneNumberId) {
      return res.status(400).json({ error: "Unable to resolve tenant: missing phone_number_id" });
    }

    const tenant = await prisma.tenant.findFirst({
      where: { whatsappPhoneNumberId: String(phoneNumberId) },
    });

    if (!tenant) {
      return res.status(404).json({ error: "No broker tenant registered for this number" });
    }

    req.tenant = tenant;
    next();
  } catch (err) {
    next(err);
  }
}
