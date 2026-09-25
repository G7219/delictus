/**
 * Deterministic intent parser — intentionally NOT generative AI. A balance
 * or share-price reply that hallucinates a number is a liability event,
 * not a UX bug, so Phase 1 sticks to rule/keyword matching. If you want
 * an LLM later, scope it to *phrasing* FAQ answers from a fixed,
 * broker-approved knowledge base — never to producing numbers directly.
 */
export type Intent =
  | { type: "BALANCE_CHECK" }
  | { type: "SHARE_PRICE"; ticker: string }
  | { type: "FAQ"; topic: string }
  | { type: "TALK_TO_AGENT" }
  | { type: "UNKNOWN" };

const TICKER_PATTERN = /\b(CRDB|NMB|TBL|NICO|TCC|DSE)\b/i;

export function parseIntent(text: string, _language: "sw" | "en"): Intent {
  const normalized = text.trim().toLowerCase();

  if (/(agent|binadamu|ongea na mtu|talk to)/.test(normalized)) {
    return { type: "TALK_TO_AGENT" };
  }
  if (/(balance|salio|akaunti yangu)/.test(normalized)) {
    return { type: "BALANCE_CHECK" };
  }
  const ticker = text.match(TICKER_PATTERN);
  if (ticker && /(price|bei)/.test(normalized)) {
    return { type: "SHARE_PRICE", ticker: ticker[0].toUpperCase() };
  }
  // TODO: match against a per-tenant FAQ knowledge-base table once one exists.
  return { type: "UNKNOWN" };
}
