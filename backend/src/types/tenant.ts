export type SubscriptionPlan = "STARTER" | "GROWTH" | "ENTERPRISE";
export type SubscriptionStatus = "PENDING" | "ACTIVE" | "PAST_DUE" | "CANCELED";

export const TIER_PRICES_TZS: Record<SubscriptionPlan, number> = {
  STARTER: 300_000,
  GROWTH: 450_000,
  ENTERPRISE: 600_000,
};
