import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import webhookRoutes from "./routes/webhook.routes";
import authRoutes from "./routes/auth.routes";
import tenantRoutes from "./routes/tenant.routes";
import billingRoutes from "./routes/billing.routes";
import brokerRoutes from "./routes/broker.routes";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/v1/whatsapp/webhook", webhookRoutes);
app.use("/v1/auth", authRoutes);
app.use("/v1/tenant", tenantRoutes);
app.use("/v1/billing", billingRoutes);
app.use("/v1/broker", brokerRoutes);

// Keep last — converts thrown/next(err) errors into a JSON response.
app.use(errorHandler);
