/**
 * @fileoverview Weather service.
 * Handles city geocoding, weather data fetching from WeatherAI,
 * response mapping, insight generation, and in-memory caching.
 */

import axios from 'axios';
import config from '../configurations/config.js';
import { weatherBreaker } from '../utils/circuitBreaker.js';
import { getCachedWeather, setCache } from '../utils/cache.js';
import { generateInsights } from '../utils/insights.js';
import AppError from '../utils/appError.js';

/**
 * Fetches current weather conditions and AI-generated insights for a given city.
 *
 * Workflow:
 * 1. Return cached result if a valid (non-expired) entry exists.
 * 2. Geocode the city name to coordinates via Nominatim.
 * 3. Fetch weather data from WeatherAI using the resolved coordinates.
 * 4. Map the raw response to the application's weather shape.
 * 5. Generate advisory insights from the mapped weather data.
 * 6. Cache and return the combined result.
 *
 * @async
 * @param {string} city - The name of the city to fetch weather for.
 * @returns {Promise<{ weather: Object, insights: string[] }>} Weather conditions and insights.
 * @throws {AppError} 400 - If the city cannot be geocoded.
 * @throws {Error} If the WeatherAI API request fails.
 *
 * @example
 * const result = await getCityWeather('Douala');
 * // → {
 * //     weather: { temperature: 21.6, condition: 'Moderate Drizzle', ... },
 * //     insights: ['High chance of rain - carry an umbrella.']
 * //   }
 */
const getCityWeather = async (city) => {
    if (!city) throw new AppError("City required", 400);

    const cached = getCachedWeather(city);
    if (cached) return cached;

    try {
        const weather = await weatherBreaker.fire(city);
        const insights = generateInsights(weather);
        const result = { weather, insights };

        setCache(city, result);
        return result;
    } catch (error) {
        if (error instanceof AppError) throw error;

        throw new AppError(error.message || 'Weather service unavailable', 503);
    }
};

export { getCityWeather };