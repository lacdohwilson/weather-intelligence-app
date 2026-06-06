import { describe, it, expect, vi } from "vitest";
import { getCityWeather } from "../../src/services/weather.service.js";
import * as weatherClient from "../../src/clients/weather.client.js";

vi.mock("../../src/clients/weather.client.js");

describe("Weather Service", () => {
    it("should return formatted weather data", async () => {
        // Match the structural requirements of mapWeatherResponse
        weatherClient.fetchWeatherByCity.mockResolvedValue({
            current: {
                temperature: 30,
                condition_code: "2",
                wind_speed: 15,
                humidity: 80,
                time: "12:00"
            },
            hourly: [
                {
                    time: "12:00",
                    humidity: 60,
                    precipitation_probability: 10
                }
            ]
        });

        const result = await getCityWeather("London");

        // Assert base structures
        expect(result).toHaveProperty("weather");
        expect(result).toHaveProperty("insights");

        // Verify mapping output (unwrapped from fallback state)
        expect(result.weather.temperature).toEqual(30);
        expect(result.weather.isFallback).toBeUndefined(); // Ensure it did not trigger the breaker
    });
});
