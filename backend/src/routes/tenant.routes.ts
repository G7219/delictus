import { Router } from "express";
import { authGuard } from "../middlewares/authGuard";
import { updateCredentials } from "../controllers/tenant.controller";

const router = Router();
router.put("/credentials", authGuard, updateCredentials);

export default router;
