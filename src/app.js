import express, { json, urlencoded } from "express";
import swaggerUi from 'swagger-ui-express';
import weatherRouter from "./routes/weather.routes.js";
import globalErrorHandler from "./controllers/error.controller.js";
import config from "./configurations/config.js";
import AppError from "./utils/appError.js";
import swaggerSpec from "./docs/swagger.js";
import morgan from "morgan";
import { DEV } from "./constants/environments.js";

const app = express();

app.use(urlencoded({ extended: true, limit: "10kb" }));

if (config.env === DEV) {
  app.use(morgan('dev'))
}

// SWAGGER DOCUMENTATION
app.use(`${config.prefix}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ROUTES
app.use(`${config.prefix}/weather`, weatherRouter);

//INVALID ROUTES
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

export default app;
