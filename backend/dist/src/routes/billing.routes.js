"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authGuard_1 = require("../middlewares/authGuard");
const billing_controller_1 = require("../controllers/billing.controller");
const router = (0, express_1.Router)();
router.post("/checkout", authGuard_1.authGuard, billing_controller_1.createSubscriptionCheckout);
exports.default = router;
