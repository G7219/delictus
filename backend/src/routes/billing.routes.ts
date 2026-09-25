import { Router } from "express";
import { authGuard } from "../middlewares/authGuard";
import { createSubscriptionCheckout } from "../controllers/billing.controller";

const router = Router();
router.post("/checkout", authGuard, createSubscriptionCheckout);

export default router;
