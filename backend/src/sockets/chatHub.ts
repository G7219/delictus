import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";

let io: SocketIOServer | undefined;

/** Real-time bridge pushing live chat + handoff events to the React agent dashboard. */
export function initChatHub(httpServer: HttpServer): void {
  io = new SocketIOServer(httpServer, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    // TODO: authenticate the socket with the agent's JWT before allowing
    // it to join a tenant room — right now any client can request any room.
    socket.on("join-tenant", (tenantId: string) => {
      socket.join(`tenant:${tenantId}`);
    });
  });
}

/** Pushes a live update to every agent dashboard connected for this tenant. */
export function pushToTenant(tenantId: string, event: string, payload: unknown): void {
  io?.to(`tenant:${tenantId}`).emit(event, payload);
}
