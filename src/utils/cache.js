/**
 * @fileoverview In-memory weather cache utility.
 * Caches weather data per city with a 10-minute TTL to reduce
 * redundant API calls to WeatherAI and Nominatim.
 */

/** @type {Map<string, { data: Object, timestamp: number }>} */
const cache = new Map();

/** Time-to-live for cached entries: 10 minutes in milliseconds */
const lastTimeCached = 10 * 60 * 1000;

/**
 * Retrieves cached weather data for a given city if it exists and has not expired.
 *
 * @param {string} city - The city name used as the cache key.
 * @returns {Object|null} The cached weather data if valid, or null if missing or expired.
 *
 * @example
 * const data = getCachedWeather('Douala');
 * if (data) {
 *   // serve from cache
 * }
 */
const getCachedWeather = (city) => {
  const cached = cache.get(city);

  if (cached && Date.now() - cached.timestamp < lastTimeCached) {
    return cached.data;
  }

  return null;
};

/**
 * Stores weather data for a given city in the cache, recording the current timestamp.
 * Overwrites any existing entry for the same city.
 *
 * @param {string} city - The city name used as the cache key.
 * @param {Object} data - The weather data object to cache.
 * @returns {void}
 *
 * @example
 * setCache('Douala', { weather: { temperature: 21.6 }, insights: [...] });
 */
const setCache = (city, data) => {
  cache.set(city, {
    data,
    timestamp: Date.now(),
  });
};

export {
  getCachedWeather,
  setCache,
};