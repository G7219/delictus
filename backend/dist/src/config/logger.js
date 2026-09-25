"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
function write(level, message, meta = {}) {
    const entry = { level, message, ...meta, timestamp: new Date().toISOString() };
    // eslint-disable-next-line no-console
    console[level === "info" ? "log" : level](JSON.stringify(entry));
}
exports.logger = {
    info: (message, meta) => write("info", message, meta),
    warn: (message, meta) => write("warn", message, meta),
    error: (message, meta) => write("error", message, meta),
};
