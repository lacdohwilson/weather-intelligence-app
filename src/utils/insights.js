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
 * - Wind speed > 40 km/h    → wind advisory
 * - No conditions triggered → stable weather message
 *
 * @param {Object} weather                    - The mapped weather conditions object.
 * @param {number} weather.rainProbability    - Probability of rain as a percentage (0–100).
 * @param {number} weather.temperature        - Current temperature in degrees Celsius.
 * @param {number} weather.windSpeed          - Current wind speed in km/h.
 * @returns {string[]} A non-empty array of advisory strings.
 *
 * @example
 * const insights = generateInsights({
 *   rainProbability: 85,
 *   temperature: 22,
 *   windSpeed: 15,
 * });
 * // → ["High chance of rain - carry an umbrella."]
 *
 * @example
 * const insights = generateInsights({
 *   rainProbability: 10,
 *   temperature: 24,
 *   windSpeed: 12,
 * });
 * // → ["Weather looks stable - good for outdoor activities."]
 */
const generateInsights = (weather) => {
  const insights = [];

  if (weather.rainProbability > 70) {
    insights.push("High chance of rain - carry an umbrella.");
  }

  if (weather.temperature > 30) {
    insights.push("Hot weather - stay hydrated.");
  }

  if (weather.windSpeed > 40) {
    insights.push("Strong winds expected - be cautious outdoors.");
  }

  if (insights.length === 0) {
    insights.push("Weather looks stable - good for outdoor activities.");
  }

  return insights;
};

export { generateInsights };