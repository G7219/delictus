import { redis } from "../config/database";

export type SessionState = "BOT" | "HUMAN_WAITING" | "HUMAN_ACTIVE";

/**
 * Redis-backed session state so every inbound message can cheaply check
 * "is this customer talking to the bot or a human?" without a DB round
 * trip. ChatSession.status in Postgres is the source of truth for
 * history/reporting; this is the hot-path cache.
 */
export async function getSessionState(sessionId: string): Promise<SessionState> {
  return ((await redis.get(`session:${sessionId}:state`)) as SessionState) ?? "BOT";
}

export async function setSessionState(sessionId: string, state: SessionState) {
  await redis.set(`session:${sessionId}:state`, state);
}
