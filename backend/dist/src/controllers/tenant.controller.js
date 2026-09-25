"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCredentials = updateCredentials;
const database_1 = require("../config/database");
const crypto_1 = require("../utils/crypto");
/** Broker admin pastes their Meta + broker-core credentials here after signup. */
async function updateCredentials(req, res, next) {
    try {
        const tenantId = req.agent.tenantId;
        const { whatsappPhoneNumberId, whatsappWabaId, whatsappAccessToken, brokerCoreApiUrl, brokerCoreApiKey } = req.body;
        const tenant = await database_1.prisma.tenant.update({
            where: { id: tenantId },
            data: {
                whatsappPhoneNumberId,
                whatsappWabaId,
                whatsappAccessToken: whatsappAccessToken ? (0, crypto_1.encrypt)(whatsappAccessToken) : undefined,
                brokerCoreApiUrl,
                brokerCoreApiKey: brokerCoreApiKey ? (0, crypto_1.encrypt)(brokerCoreApiKey) : undefined,
            },
        });
        res.json({ id: tenant.id, slug: tenant.slug });
    }
    catch (err) {
        next(err);
    }
}
