import catchAsync from "../utils/catchAsync.js";
import { getCachedWeather, setCache } from "../utils/cache.js";
import { getCityWeather } from "../services/weather.service.js";
import { generateInsights } from "../utils/insights.js";

const getWeather = catchAsync(async (req, res, next) => {
  const { city } = req.params;

  const data = await getCityWeather(city);

  res.status(200).json({
    status: "success",
    message: "City weather fetched successfully",
    data,
  });
});

export default {
  getWeather,
};
