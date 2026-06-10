import express, { json, urlencoded } from "express";
import swaggerUi from 'swagger-ui-express';
import weatherRouter from "./routes/weather.routes.js";
import metricsRouter from "./monitoring/metrics.routes.js";
import metricsMiddleware from "./monitoring/metrics.middleware.js";
import globalErrorHandler from "./controllers/error.controller.js";
import config from "./configurations/config.js";
import AppError from "./utils/appError.js";
import swaggerSpec from "./docs/swagger.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";
import morgan from "morgan";
import { DEV, TEST } from "./constants/environments.js";
import { requestLogger } from "./middlewares/requestLogger.js";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true, limit: "10kb" }));

if (config.env === DEV) {
  app.use(morgan('dev'))
}

// RATE LIMITER - skip in test environment
if (config.env !== TEST) {
  app.use(apiLimiter);
}

// REQUEST LOGGERS
app.use(requestLogger);

// SWAGGER DOCUMENTATION
app.use(`${config.prefix}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// METRICS
app.use(metricsMiddleware);

// ROUTES
app.use(`${config.prefix}/weather`, weatherRouter);
app.use(`${config.prefix}/metrics`, metricsRouter);

//INVALID ROUTES
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

export default app;
