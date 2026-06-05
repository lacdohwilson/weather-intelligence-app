import { Router } from "express";
import weatherController from "../controllers/weather.controller.js";

const router = Router();

// GET: /weather?city=Douala
router.get("/", weatherController.getWeather);

export default router;
