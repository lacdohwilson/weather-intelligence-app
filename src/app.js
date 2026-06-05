import express, { json, urlencoded } from "express";
import weatherRouter from "./routes/weather.routes.js";
import config from "./configurations/config.js";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/error.controller.js";

const app = express();

app.use(urlencoded({ extended: true, limit: "10kb" }));

// ROUTES
app.use(`${config.prefix}/weather`, weatherRouter);

//INVALID ROUTES
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

export default app;
