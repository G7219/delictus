import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

/** Lazily connects to chatHub and joins the given tenant's room. */
export function connectSocket(tenantId: string): Socket {
  if (!socket) {
    socket = io(import.meta.env.VITE_SOCKET_URL ?? "http://localhost:4000");
  }
  socket.emit("join-tenant", tenantId);
  return socket;
}
