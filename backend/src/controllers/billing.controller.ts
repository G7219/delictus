import { Request, Response, NextFunction } from "express";
import { createPaymentLink } from "../services/gateway.services";
import { TIER_PRICES_TZS, SubscriptionPlan } from "../types/tenant";

export async function createSubscriptionCheckout(req: Request, res: Response, next: NextFunction) {
  try {
    const tenantId = req.agent!.tenantId;
    const plan = req.body.plan as SubscriptionPlan;
    const link = await createPaymentLink(tenantId, TIER_PRICES_TZS[plan], "MONTHLY_SUBSCRIPTION");
    res.json(link);
  } catch (err) {
    next(err);
  }
}

// TODO: gateway webhook handler — on confirmed payment, flip the matching
// Invoice.status to PAID and Tenant.subscriptionStatus to ACTIVE /
// setupFeePaid to true. See README "Handling renewals automatically".
