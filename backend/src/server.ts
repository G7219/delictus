import "dotenv/config";
import { createServer } from "http";
import { app } from "./app";
import { env } from "./config/env";
import { logger } from "./config/logger";
import { initChatHub } from "./sockets/chatHub";

const httpServer = createServer(app);
initChatHub(httpServer);

httpServer.listen(env.PORT, () => {
  logger.info(`dse-broker-saas backend listening on :${env.PORT}`);
});
