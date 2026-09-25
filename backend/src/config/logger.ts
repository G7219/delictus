// Minimal structured JSON logger so log lines are grep/aggregator-friendly
// from day one. Swap the implementation for pino/winston as volume grows —
// keep this exported shape stable so callers never need to change.
type Level = "info" | "warn" | "error";

function write(level: Level, message: string, meta: Record<string, unknown> = {}) {
  const entry = { level, message, ...meta, timestamp: new Date().toISOString() };
  // eslint-disable-next-line no-console
  console[level === "info" ? "log" : level](JSON.stringify(entry));
}

export const logger = {
  info: (message: string, meta?: Record<string, unknown>) => write("info", message, meta),
  warn: (message: string, meta?: Record<string, unknown>) => write("warn", message, meta),
  error: (message: string, meta?: Record<string, unknown>) => write("error", message, meta),
};
