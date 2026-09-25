"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWhatsAppMessage = sendWhatsAppMessage;
const crypto_1 = require("../utils/crypto");
/** Sends an outbound message using the broker's own (BYO) Meta access token. */
async function sendWhatsAppMessage(tenant, to, text) {
    if (!tenant.whatsappAccessToken || !tenant.whatsappPhoneNumberId) {
        throw new Error(`Tenant ${tenant.id} has not configured WhatsApp credentials`);
    }
    const accessToken = (0, crypto_1.decrypt)(tenant.whatsappAccessToken);
    const res = await fetch(`https://graph.facebook.com/v20.0/${tenant.whatsappPhoneNumberId}/messages`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            messaging_product: "whatsapp",
            to,
            text: { body: text },
        }),
    });
    if (!res.ok) {
        throw new Error(`WhatsApp send failed: ${res.status} ${await res.text()}`);
    }
}
