"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initChatHub = initChatHub;
exports.pushToTenant = pushToTenant;
const socket_io_1 = require("socket.io");
let io;
/** Real-time bridge pushing live chat + handoff events to the React agent dashboard. */
function initChatHub(httpServer) {
    io = new socket_io_1.Server(httpServer, { cors: { origin: "*" } });
    io.on("connection", (socket) => {
        // TODO: authenticate the socket with the agent's JWT before allowing
        // it to join a tenant room — right now any client can request any room.
        socket.on("join-tenant", (tenantId) => {
            socket.join(`tenant:${tenantId}`);
        });
    });
}
/** Pushes a live update to every agent dashboard connected for this tenant. */
function pushToTenant(tenantId, event, payload) {
    io?.to(`tenant:${tenantId}`).emit(event, payload);
}
