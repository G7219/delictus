import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";

const TIERS = [
  { plan: "STARTER", priceTzs: 300_000, seats: "2 agents", channels: "WhatsApp + Website" },
  { plan: "GROWTH", priceTzs: 450_000, seats: "6 agents", channels: "+ Facebook Messenger" },
  { plan: "ENTERPRISE", priceTzs: 600_000, seats: "Unlimited agents", channels: "+ Instagram + Telegram" },
] as const;

export function Billing() {
  return (
    <div className="p-6">
      <h1 className="text-lg font-medium mb-1">Billing</h1>
      <p className="text-sm text-muted mb-6">Setup fee and monthly subscription management.</p>

      <div className="grid grid-cols-3 gap-4">
        {TIERS.map((tier) => (
          <div key={tier.plan} className="border border-border rounded p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">{tier.plan}</span>
              <Badge label={tier.plan === "GROWTH" ? "Most common" : "Plan"} tone="neutral" />
            </div>
            <p className="text-xl font-figures mb-1">{tier.priceTzs.toLocaleString("en-US")} TZS</p>
            <p className="text-xs text-muted mb-1">per month</p>
            <p className="text-sm text-muted mb-1">{tier.seats}</p>
            <p className="text-sm text-muted mb-4">{tier.channels}</p>
            {/* TODO: wire to POST /v1/billing/checkout via services/api.ts */}
            <Button variant="secondary" className="w-full">
              Manage plan
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
