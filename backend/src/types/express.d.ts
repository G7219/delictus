import { Tenant } from "@prisma/client";

// Augments Express's Request so tenantResolver / authGuard can attach
// resolved context that every downstream controller relies on.
declare global {
  namespace Express {
    interface Request {
      tenant?: Tenant;
      agent?: { id: string; tenantId: string; role: string };
    }
  }
}

export {};
