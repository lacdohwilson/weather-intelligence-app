/**
 * @breif Generate weather insights
 * @param {Object} weather 
 * @returns {Array}
 */
const generateInsights = (weather) => {
  const insights = [];

  if (weather.rain_probability > 70) {
    insights.push("High chance of rain - carry an umbrella.");
  }

  if (weather.temperature > 30) {
    insights.push("Hot weather - stay hydrated.");
  }

  if (weather.wind_speed > 40) {
    insights.push("Strong winds expected - be cautious outdoors.");
  }

  if (insights.length === 0) {
    insights.push("Weather looks stable - good for outdoor activities.");
  }

  return insights;
};

export {
  generateInsights
};
