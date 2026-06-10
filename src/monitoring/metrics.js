import client from 'prom-client';

// Create registry
export const register = new client.Registry();

// Default Node.js metrics (CPU, memory, event loop)
client.collectDefaultMetrics({ register });

// Custom HTTP duration metric
export const httpRequestDuration = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [50, 100, 300, 500, 1000, 3000, 5000],
});

// Register custom metric
register.registerMetric(httpRequestDuration);