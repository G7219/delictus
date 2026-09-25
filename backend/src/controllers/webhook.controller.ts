import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/database";
import { logger } from "../config/logger";
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
export async function receiveWhatsAppMessage(req: Request, res: Response, next: NextFunction) {
  try {
    const tenant = req.tenant!;
    const entry = req.body?.entry?.[0]?.changes?.[0]?.value;
    const message = entry?.messages?.[0];

    if (!message) {
      // Meta also posts delivery/read status callbacks to this same URL — ignore those.
      return res.sendStatus(200);
    }

    const customerPhone: string = message.from;
    const text: string = message.text?.body ?? "";
    const sessionId = `${tenant.id}:${customerPhone}`;

    const session = await prisma.chatSession.upsert({
      where: { id: sessionId },
      update: {},
      create: {
        id: sessionId,
        tenantId: tenant.id,
        customerPhone,
        language: tenant.defaultLanguage,
      },
    });

    await prisma.message.create({
      data: { chatSessionId: session.id, sender: "CUSTOMER", text },
    });

    if (session.status === "HUMAN_ACTIVE") {
      // TODO: pushToTenant(tenant.id, "new-message", { sessionId, text })
      return res.sendStatus(200);
    }

    // TODO: const intent = parseIntent(text, session.language as "sw" | "en");
    // TODO: route on intent.type — FAQ | BALANCE_CHECK | SHARE_PRICE | TALK_TO_AGENT | UNKNOWN
    // TODO: await sendWhatsAppMessage(tenant, customerPhone, replyText);
    logger.info("Inbound message received", { tenantId: tenant.id, sessionId: session.id });

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

/** Meta's webhook verification handshake (GET request carrying hub.challenge). */
export function verifyWebhook(req: Request, res: Response) {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.META_VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  res.sendStatus(403);
}
