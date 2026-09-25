import { Tenant } from "@prisma/client";
import { decrypt } from "../utils/crypto";

/** Sends an outbound message using the broker's own (BYO) Meta access token. */
export async function sendWhatsAppMessage(tenant: Tenant, to: string, text: string): Promise<void> {
  if (!tenant.whatsappAccessToken || !tenant.whatsappPhoneNumberId) {
    throw new Error(`Tenant ${tenant.id} has not configured WhatsApp credentials`);
  }
  const accessToken = decrypt(tenant.whatsappAccessToken);

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
