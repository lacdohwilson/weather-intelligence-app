import httpClient from "./http.client.js";
import { NOMINATIM_BASE_URL, WEATHER_AI_BASE_URL } from "../constants/urls.js";
import config from "../configurations/config.js";

/**
 * Resolves a city name to geographic coordinates using the Nominatim geocoding API.
 *
 * @async
 * @param {string} city - The city name to geocode. Will be trimmed and URI-decoded.
 * @returns {Promise<{ lat: string, lon: string }>} Resolved latitude and longitude strings.
 * @throws {AppError} 400 - If no matching city is found in the Nominatim response.
 *
 * @example
 * const { lat, lon } = await geocodeCity('Douala');
 * // → { lat: '4.0622', lon: '9.7794' }
 */
export const fetchCityCoord = async (city) => {
    const response = await httpClient.get(`${NOMINATIM_BASE_URL}/search`, {
        params: {
            city: decodeURIComponent(city.trim()),
            format: 'json',
            limit: 1,
        },
        headers: {
            'User-Agent': 'weather-intelligence-app/1.0',
        },
    });

    if (!response.data.length) {
        throw new AppError(`City not found: ${city}`, 404);
    }

    const { lat, lon } = response.data[0];
    return { lat, lon };
};

export const fetchWeatherByCity = async (city) => {

    const { lat, lon } = await fetchCityCoord(city);

    const response = await httpClient.get(`${WEATHER_AI_BASE_URL}/v1/weather`, {
        params: { lat, lon, ai: false },
        headers: { Authorization: `Bearer ${config.weather.api_key}` },
    });

    return response.data;
};
