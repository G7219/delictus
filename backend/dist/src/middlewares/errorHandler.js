"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const logger_1 = require("../config/logger");
// Keep this registered LAST in app.ts — Express only routes to it when a
// handler calls next(err) or throws inside an async wrapper.
function errorHandler(err, _req, res, _next) {
    const message = err instanceof Error ? err.message : "Unknown error";
    logger_1.logger.error("Unhandled error", { message });
    res.status(500).json({ error: "Internal server error" });
}
