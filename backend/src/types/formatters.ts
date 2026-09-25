/** Formats a whole-number TZS amount, e.g. formatTzs(1500000) -> "1,500,000 TZS". */
export function formatTzs(amount: number): string {
  return `${amount.toLocaleString("en-US")} TZS`;
}

/** Formats a share quantity, e.g. formatShares(1) -> "1 share", formatShares(1500) -> "1,500 shares". */
export function formatShares(quantity: number): string {
  return `${quantity.toLocaleString("en-US")} ${quantity === 1 ? "share" : "shares"}`;
}
