"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tenantResolver_1 = require("../middlewares/tenantResolver");
const webhook_controller_1 = require("../controllers/webhook.controller");
const router = (0, express_1.Router)();
router.get("/", webhook_controller_1.verifyWebhook);
router.post("/", tenantResolver_1.tenantResolver, webhook_controller_1.receiveWhatsAppMessage);
exports.default = router;
