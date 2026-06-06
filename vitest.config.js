// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        testTimeout: 10000,
        environment: 'node',
        env: {
            NODE_ENV: 'test',
        },
    },
});