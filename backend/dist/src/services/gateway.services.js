"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentLink = createPaymentLink;
async function createPaymentLink(tenantId, amountTzs, purpose) {
    // TODO: call the chosen provider's checkout API and return a real link.
    throw new Error(`Not implemented — plug in Selcom/DPO/Azam Pay checkout API for tenant=${tenantId} amount=${amountTzs} purpose=${purpose}`);
}
