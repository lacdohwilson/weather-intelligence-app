import { Router } from "express";
import weatherController from "../controllers/weather.controller.js";

const router = Router();

// GET: /weather/:city
router.get("/:city", weatherController.getWeather);

export default router;
