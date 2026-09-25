import { Router } from "express";
import { tenantResolver } from "../middlewares/tenantResolver";
import { receiveWhatsAppMessage, verifyWebhook } from "../controllers/webhook.controller";

const router = Router();

router.get("/", verifyWebhook);
router.post("/", tenantResolver, receiveWhatsAppMessage);

export default router;
