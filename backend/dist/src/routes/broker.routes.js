"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tenantResolver_1 = require("../middlewares/tenantResolver");
const brokerApi_controller_1 = require("../controllers/brokerApi.controller");
const router = (0, express_1.Router)();
router.get("/balance", tenantResolver_1.tenantResolver, brokerApi_controller_1.getBalance);
exports.default = router;
