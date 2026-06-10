import client from 'prom-client';

export const register = new client.Registry();

client.collectDefaultMetrics({ register });

export const httpRequestDuration = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'status'],
    buckets: [50, 100, 300, 500, 1000, 3000, 5000],
});

export const httpRequestsTotal = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status'],
});

export const activeRequests = new client.Gauge({
    name: 'active_requests',
    help: 'Currently active requests',
});

register.registerMetric(httpRequestDuration);
register.registerMetric(httpRequestsTotal);
register.registerMetric(activeRequests);