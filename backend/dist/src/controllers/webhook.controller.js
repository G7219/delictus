"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiveWhatsAppMessage = receiveWhatsAppMessage;
exports.verifyWebhook = verifyWebhook;
const database_1 = require("../config/database");
const logger_1 = require("../config/logger");
// TODO: wire these in as each piece lands —
// import { parseIntent } from "../services/nlp.service";
// import { sendWhatsAppMessage } from "../services/whatsapp.service";
// import { pushToTenant } from "../sockets/chatHub";
/**
 * Meta calls this on every inbound WhatsApp message. tenantResolver
 * middleware has already attached req.tenant based on phone_number_id.
 *
 * Flow (see README "How the files interact"):
 *  1. Find/create the ChatSession for this customer + tenant.
 *  2. If status is HUMAN_ACTIVE, store the message and notify the
 *     assigned agent via chatHub — skip NLP entirely.
 *  3. Otherwise run nlp.service for intent: reply directly for FAQs/
 *     balance requests, or flip status to HUMAN_WAITING on low
 *     confidence / explicit "talk to agent".
 */
async function receiveWhatsAppMessage(req, res, next) {
    try {
        const tenant = req.tenant;
        const entry = req.body?.entry?.[0]?.changes?.[0]?.value;
        const message = entry?.messages?.[0];
        if (!message) {
            // Meta also posts delivery/read status callbacks to this same URL — ignore those.
            return res.sendStatus(200);
        }
        const customerPhone = message.from;
        const text = message.text?.body ?? "";
        const sessionId = `${tenant.id}:${customerPhone}`;
        const session = await database_1.prisma.chatSession.upsert({
            where: { id: sessionId },
            update: {},
            create: {
                id: sessionId,
                tenantId: tenant.id,
                customerPhone,
                language: tenant.defaultLanguage,
            },
        });
        await database_1.prisma.message.create({
            data: { chatSessionId: session.id, sender: "CUSTOMER", text },
        });
        if (session.status === "HUMAN_ACTIVE") {
            // TODO: pushToTenant(tenant.id, "new-message", { sessionId, text })
            return res.sendStatus(200);
        }
        // TODO: const intent = parseIntent(text, session.language as "sw" | "en");
        // TODO: route on intent.type — FAQ | BALANCE_CHECK | SHARE_PRICE | TALK_TO_AGENT | UNKNOWN
        // TODO: await sendWhatsAppMessage(tenant, customerPhone, replyText);
        logger_1.logger.info("Inbound message received", { tenantId: tenant.id, sessionId: session.id });
        res.sendStatus(200);
    }
    catch (err) {
        next(err);
    }
}
/** Meta's webhook verification handshake (GET request carrying hub.challenge). */
function verifyWebhook(req, res) {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    if (mode === "subscribe" && token === process.env.META_VERIFY_TOKEN) {
        return res.status(200).send(challenge);
    }
    res.sendStatus(403);
}
