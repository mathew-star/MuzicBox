import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/ApiError.js";
import { logger } from "../utils/logger.js";

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  logger.error(`[${req.method}] ${req.path} → ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
  });
};
