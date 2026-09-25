"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authGuard_1 = require("../middlewares/authGuard");
const tenant_controller_1 = require("../controllers/tenant.controller");
const router = (0, express_1.Router)();
router.put("/credentials", authGuard_1.authGuard, tenant_controller_1.updateCredentials);
exports.default = router;
