"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseIntent = parseIntent;
const TICKER_PATTERN = /\b(CRDB|NMB|TBL|NICO|TCC|DSE)\b/i;
function parseIntent(text, _language) {
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
