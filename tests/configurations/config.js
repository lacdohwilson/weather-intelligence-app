import request from "supertest";
import { beforeAll, afterAll } from "vitest";
import app from "../../src/app.js";
import config from "../../src/configurations/config.js";
import logger from "../../src/utils/logger.js";

let server;

beforeAll(() => {
    server = app.listen(0, () => {
        logger.info(`Test server running on port ${server.address().port}`);
    });
});

afterAll(async () => {
    if (server) {
        await new Promise((resolve, reject) => {
            server.close((err) => {
                if (err) return reject(err);
                resolve();
            });
        });
        logger.info("Test server closed");
    }
});

export const api = request(server);
export const BASE_URL = config.API_PREFIX || "/api/v1";

