"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubscriptionCheckout = createSubscriptionCheckout;
const gateway_services_1 = require("../services/gateway.services");
const tenant_1 = require("../types/tenant");
async function createSubscriptionCheckout(req, res, next) {
    try {
        const tenantId = req.agent.tenantId;
        const plan = req.body.plan;
        const link = await (0, gateway_services_1.createPaymentLink)(tenantId, tenant_1.TIER_PRICES_TZS[plan], "MONTHLY_SUBSCRIPTION");
        res.json(link);
    }
    catch (err) {
        next(err);
    }
}
// TODO: gateway webhook handler — on confirmed payment, flip the matching
// Invoice.status to PAID and Tenant.subscriptionStatus to ACTIVE /
// setupFeePaid to true. See README "Handling renewals automatically".
