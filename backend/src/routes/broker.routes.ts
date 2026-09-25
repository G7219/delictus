import { Router } from "express";
import { tenantResolver } from "../middlewares/tenantResolver";
import { getBalance } from "../controllers/brokerApi.controller";

const router = Router();
router.get("/balance", tenantResolver, getBalance);

export default router;
