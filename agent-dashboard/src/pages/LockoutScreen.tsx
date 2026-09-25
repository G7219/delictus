import { formatTzsRange } from "../lib/format";

/** Shown in place of the dashboard while a broker's setup fee is unpaid. */
export function LockoutScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy text-center px-6">
      <div className="max-w-sm">
        <h1 className="text-lg font-medium mb-2">Setup fee required</h1>
        <p className="text-sm text-muted">
          Your dashboard unlocks once the one-time setup fee ({formatTzsRange(1_000_000, 5_000_000)}) is paid.
          Contact your account manager or open Billing to pay now.
        </p>
      </div>
    </div>
  );
}
