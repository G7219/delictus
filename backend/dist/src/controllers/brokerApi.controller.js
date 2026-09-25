"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBalance = getBalance;
const crypto_1 = require("../utils/crypto");
/**
 * Read-only proxy to the broker's own core system. Phase 1 scope is
 * balance + portfolio *reads* only, gated behind OTP verification
 * upstream — never write to the broker's core system from here.
 */
async function getBalance(req, res, next) {
    try {
        const tenant = req.tenant;
        if (!tenant.brokerCoreApiUrl || !tenant.brokerCoreApiKey) {
            return res.status(422).json({ error: "Broker core API not configured for this tenant" });
        }
        const apiKey = (0, crypto_1.decrypt)(tenant.brokerCoreApiKey);
        const cdsAccount = req.query.cdsAccount;
        const upstream = await fetch(`${tenant.brokerCoreApiUrl}/accounts/${cdsAccount}/balance`, {
            headers: { Authorization: `Bearer ${apiKey}` },
        });
        if (!upstream.ok) {
            return res.status(502).json({ error: "Broker core system unavailable" });
        }
        res.json(await upstream.json());
    }
    catch (err) {
        next(err);
    }
}
