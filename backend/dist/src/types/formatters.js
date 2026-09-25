"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTzs = formatTzs;
exports.formatShares = formatShares;
/** Formats a whole-number TZS amount, e.g. formatTzs(1500000) -> "1,500,000 TZS". */
function formatTzs(amount) {
    return `${amount.toLocaleString("en-US")} TZS`;
}
/** Formats a share quantity, e.g. formatShares(1) -> "1 share", formatShares(1500) -> "1,500 shares". */
function formatShares(quantity) {
    return `${quantity.toLocaleString("en-US")} ${quantity === 1 ? "share" : "shares"}`;
}
