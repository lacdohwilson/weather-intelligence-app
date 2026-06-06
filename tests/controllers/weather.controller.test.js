import request from "supertest";
import { describe, it, expect, vi, beforeEach, afterAll } from "vitest";
import app from "../../src/app.js";
import { getCityWeather } from "../../src/services/weather.service.js";
import AppError from "../../src/utils/appError.js";

vi.mock("../../src/services/weather.service.js");

const URL = "/api/v1/weather";

describe(`GET ${URL}?city=`, () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterAll(async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
    });

    it("should return weather data with insights", async () => {
        getCityWeather.mockResolvedValue({
            weather: {
                temperature: 30,
                condition: "Partly Cloudy",
                humidity: 80,
                windSpeed: 12,
                rainProbability: 20,
            },
            insights: ["Weather looks stable - good for outdoor activities."],
        });

        const res = await request(app).get(`${URL}?city=London`);

        expect(res.status).toBe(200);
        expect(res.body.status).toBe("success");
        expect(res.body.data.weather.temperature).toBe(30);
        expect(res.body.data.insights).toBeInstanceOf(Array);
    });

    it("should return 400 when city is missing", async () => {
        const res = await request(app).get(`${URL}`);

        expect(res.status).toBe(400);
        expect(res.body.status).toBe("fail");
        expect(res.body.message).toBe("City name is required");
    });

    it("should return 400 when city is blank", async () => {
        const res = await request(app).get(`${URL}?city=`);

        expect(res.status).toBe(400);
        expect(res.body.status).toBe("fail");
        expect(res.body.message).toBe("City name is required");
    });

    it("should return 404 when city is not found", async () => {
        getCityWeather.mockRejectedValue(new AppError("City not found: xyz", 404));

        const res = await request(app).get(`${URL}?city=xyz`);

        expect(res.status).toBe(404);
        expect(res.body.status).toBe("fail");
        expect(res.body.message).toContain("City not found");
    });

    it("should return 503 when weather service is unavailable", async () => {
        getCityWeather.mockRejectedValue(new AppError("Weather service unavailable", 503));

        const res = await request(app).get(`${URL}?city=Douala`);

        expect(res.status).toBe(503);
        expect(res.body.status).toBe("error");
    });

    it("should return fallback data when circuit breaker is open", async () => {
        getCityWeather.mockResolvedValue({
            weather: {
                temperature: null,
                condition: "Unknown",
                humidity: null,
                windSpeed: null,
                rainProbability: null,
            },
            insights: [],
            isFallback: true,
        });

        const res = await request(app).get(`${URL}?city=Douala`);

        expect(res.status).toBe(200);
        expect(res.body.data.isFallback).toBe(true);
    });
});