import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/database";
import { encrypt } from "../utils/crypto";

/** Broker admin pastes their Meta + broker-core credentials here after signup. */
export async function updateCredentials(req: Request, res: Response, next: NextFunction) {
  try {
    const tenantId = req.agent!.tenantId;
    const { whatsappPhoneNumberId, whatsappWabaId, whatsappAccessToken, brokerCoreApiUrl, brokerCoreApiKey } =
      req.body as Record<string, string | undefined>;

    const tenant = await prisma.tenant.update({
      where: { id: tenantId },
      data: {
        whatsappPhoneNumberId,
        whatsappWabaId,
        whatsappAccessToken: whatsappAccessToken ? encrypt(whatsappAccessToken) : undefined,
        brokerCoreApiUrl,
        brokerCoreApiKey: brokerCoreApiKey ? encrypt(brokerCoreApiKey) : undefined,
      },
    });

    res.json({ id: tenant.id, slug: tenant.slug });
  } catch (err) {
    next(err);
  }
}
