import catchAsync from "../utils/catchAsync.js";

const getWeather = catchAsync(async (req, res, next) => {
  const { city } = req.query;

  const cached = getCachedWeather(city);

  if (cached) {
    res.status(200).json({
      status: "success",
      message: "City weather fetched successfully",
      data: cached.data,
    });
  }

  const weather = await getCityWeather(city);
  const insights = generateInsights(weather);

  const result = { weather, insights };

  setCache(city, result);

  res.status(200).json({
    status: "success",
    message: "City weather fetched successfully",
    data: result.data,
  });
});

export default {
  getWeather,
};
