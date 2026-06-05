/**
 * @fileoverview Weather insights generator.
 * Analyzes current weather conditions and returns a list of
 * human-readable advisory messages based on defined thresholds.
 */

/**
 * Generates a list of weather insights based on current conditions.
 *
 * Thresholds applied:
 * - Rain probability > 70%  → rain advisory
 * - Temperature > 30°C      → heat advisory
 * - Temperature < 10°C      → cold advisory
 * - Humidity > 80%          → high humidity advisory
 * - Humidity < 30%          → dry air advisory
 * - Wind speed > 40 km/h    → wind advisory
 * - Fallback active         → system offline/fallback data message
 * - No conditions triggered → stable weather message
 *
 * @param {Object} weather                    - The mapped weather conditions object.
 * @param {number} weather.rainProbability    - Probability of rain as a percentage (0–100).
 * @param {number|null} weather.temperature   - Current temperature in degrees Celsius (null if fallback).
 * @param {number|null} weather.humidity      - Current humidity percentage (0-100, null if fallback).
 * @param {number} weather.windSpeed          - Current wind speed in km/h.
 * @param {boolean} [weather.isFallback]      - Optional flag indicating fallback data.
 * @returns {string[]} A non-empty array of advisory strings.
 */
const generateInsights = (weather) => {
  const insights = [];

  // 1. Rain Assessment
  if (weather.rainProbability > 70) {
    insights.push("High chance of rain - carry an umbrella.");
  }

  // 2. Temperature Assessment (Protected against null fallback values)
  if (weather.temperature !== null) {
    if (weather.temperature > 30) {
      insights.push("Hot weather - stay hydrated.");
    } else if (weather.temperature < 10) {
      insights.push("Cold weather - dress warmly in layers.");
    }
  }

  // 3. Humidity Assessment (Protected against null fallback values)
  if (weather.humidity !== null) {
    if (weather.humidity > 80) {
      insights.push("High humidity - it might feel sticky or muggy outdoors.");
    } else if (weather.humidity < 30) {
      insights.push("Low humidity - dry air conditions expected.");
    }
  }

  // 4. Wind Assessment
  if (weather.windSpeed > 40) {
    insights.push("Strong winds expected - be cautious outdoors.");
  }

  // 5. Fallback & Empty State Handling
  if (insights.length === 0) {
    if (weather?.isFallback) {
      insights.push("Live weather service temporarily down. Displaying cached estimates.");
    } else {
      insights.push("Weather looks stable - good for outdoor activities.");
    }
  }

  return insights;
};

export { generateInsights };
