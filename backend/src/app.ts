import express from "express";
import cors from "cors";
import { requestId } from "./middlewares/requestId.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { logger } from "./utils/logger.js";

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(requestId);

// Health Check
app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "API is healthy 💚" });
});

// 404 + Error
app.use(notFound);
app.use(errorHandler);

export default app;
