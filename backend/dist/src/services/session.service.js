"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessionState = getSessionState;
exports.setSessionState = setSessionState;
const database_1 = require("../config/database");
/**
 * Redis-backed session state so every inbound message can cheaply check
 * "is this customer talking to the bot or a human?" without a DB round
 * trip. ChatSession.status in Postgres is the source of truth for
 * history/reporting; this is the hot-path cache.
 */
async function getSessionState(sessionId) {
    return (await database_1.redis.get(`session:${sessionId}:state`)) ?? "BOT";
}
async function setSessionState(sessionId, state) {
    await database_1.redis.set(`session:${sessionId}:state`, state);
}
