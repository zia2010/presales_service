import express from "express";
import cors from "cors";
import leadRoutes from "./routes/lead.routes";
import webhookRoutes from "./webhooks/call.webhook";

const app = express();

// SECURITY_NOTE: Restrict CORS origins in production.
app.use(cors());
app.use(express.json({ limit: "100kb" }));

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/lead", leadRoutes);
app.use("/webhook", webhookRoutes);

export default app;
