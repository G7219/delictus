/**
 * Local payment gateway integration point (Selcom / DPO / Azam Pay) for
 * setup fees and monthly subscriptions. Each provider has its own
 * checkout + webhook signature format — normalize to PaymentLink here so
 * billing.controller.ts never needs to know which provider is active.
 */
export interface PaymentLink {
  url: string;
  reference: string;
}

export async function createPaymentLink(
  tenantId: string,
  amountTzs: number,
  purpose: "SETUP_FEE" | "MONTHLY_SUBSCRIPTION"
): Promise<PaymentLink> {
  // TODO: call the chosen provider's checkout API and return a real link.
  throw new Error(
    `Not implemented — plug in Selcom/DPO/Azam Pay checkout API for tenant=${tenantId} amount=${amountTzs} purpose=${purpose}`
  );
}
