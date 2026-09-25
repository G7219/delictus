"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const http_1 = require("http");
const app_1 = require("./app");
const env_1 = require("./config/env");
const logger_1 = require("./config/logger");
const chatHub_1 = require("./sockets/chatHub");
const httpServer = (0, http_1.createServer)(app_1.app);
(0, chatHub_1.initChatHub)(httpServer);
httpServer.listen(env_1.env.PORT, () => {
    logger_1.logger.info(`dse-broker-saas backend listening on :${env_1.env.PORT}`);
});
