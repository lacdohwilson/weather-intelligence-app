import config from "../configurations/config.js";
import { DEV, PROD } from "../constants/environments.js";
import logger from "../utils/logger.js";

const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    // A) Operational, trusted error
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    // B) Programming or unknown errors → log + generic response
    logger.error("🔥 UNEXPECTED ERROR:", {
      message: err.message,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
      ip: req.ip,
    });

    return res.status(500).json({
      status: "error",
      message: "Something went wrong on our end.",
    });
  }
};

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // 🔥 Log ALL 500-level errors in production (important addition)
  if (config.env === PROD && err.statusCode === 500) {
    logger.error("💥 Internal Server Error", {
      message: err.message,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
      ip: req.ip,
    });
  }

  if (config.env === DEV) {
    sendErrorDev(err, req, res);
  } else if (config.env === PROD) {
    sendErrorProd(err, req, res); // fixed bug here
  }
};