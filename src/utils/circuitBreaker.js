import CircuitBreaker from "opossum";
import { fetchWeatherByCity } from "../clients/weather.client.js";
import logger from "./logger.js";
import AppError from "./appError.js";


/**
 * Maps a WMO weather condition code to a human-readable label.
 *
 * @param {number|string} code - The WMO condition code from the WeatherAI response.
 * @returns {string} A readable condition label, or 'Unknown' if the code is unrecognised.
 *
 * @example
 * getConditionLabel(3);  // → 'Overcast'
 * getConditionLabel(63); // → 'Moderate Rain'
 * getConditionLabel(99); // → 'Unknown'
 */
const getConditionLabel = (code) => {
    const map = {
        0: 'Clear', 1: 'Mainly Clear', 2: 'Partly Cloudy', 3: 'Overcast',
        51: 'Light Drizzle', 53: 'Moderate Drizzle', 55: 'Dense Drizzle',
        61: 'Slight Rain', 63: 'Moderate Rain', 65: 'Heavy Rain',
        80: 'Light Showers', 81: 'Moderate Showers', 82: 'Heavy Showers',
    };
    return map[Number(code)] ?? 'Unknown';
};

/**
 * Maps a raw WeatherAI API response to the application's weather shape.
 * Extracts current conditions and matches the current hour's hourly entry
 * to obtain humidity and rain probability.
 *
 * @param {Object} raw                          - Raw response body from GET /v1/weather.
 * @param {Object} raw.current                  - Current weather conditions.
 * @param {string} raw.current.time             - ISO datetime string of the current observation.
 * @param {number} raw.current.temperature      - Current temperature in °C.
 * @param {number} raw.current.wind_speed       - Current wind speed in km/h.
 * @param {string} raw.current.condition_code   - WMO condition code.
 * @param {Object[]} raw.hourly                 - Hourly forecast array.
 * @param {string} city                         - The city name requested by the client
 * @returns {{
 *   city: string
 *   temperature: number,
 *   condition: string,
 *   humidity: number|null,
 *   windSpeed: number,
 *   rainProbability: number
 * }} Mapped weather object ready for insight generation and API response.
 */
const mapWeatherResponse = (raw, city) => ({
    city,
    temperature: raw.current.temperature,
    condition: getConditionLabel(raw.current.condition_code),
    humidity: raw.hourly?.[0]?.humidity ?? null,
    windSpeed: raw.current.wind_speed,
    rainProbability: raw.hourly?.find(h => h.time === raw.current.time)?.precipitation_probability ?? 0,
});


// function wrapped by breaker
const weatherCall = async (city) => {
    const rawData = await fetchWeatherByCity(city);
    return mapWeatherResponse(rawData, city);
}

export const weatherBreaker = new CircuitBreaker(weatherCall, {
    timeout: 1 * 60 * 1000, // 1 minute in milliseconds (60,000 ms)
    errorThresholdPercentage: 50,
    resetTimeout: 10000, // 10 seconds in milliseconds
    isFailure: (error) => !(error instanceof AppError)
});

weatherBreaker.fallback((city, error) => {
    if (error instanceof AppError) throw error;

    logger.warn(`Weather API timed out for ${city}. Serving fallback data.`);

    return {
        weather: {
            temperature: null,
            condition: "Unknown",
            humidity: null,
            windSpeed: null,
            rainProbability: null
        },
        isFallback: true
    }
})
