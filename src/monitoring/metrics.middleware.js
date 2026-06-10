import {
    activeRequests,
    httpRequestDuration,
    httpRequestsTotal,
} from './metrics.js';

const metricsMiddleware = (req, res, next) => {
    activeRequests.inc();

    const end = httpRequestDuration.startTimer();

    res.on('finish', () => {
        activeRequests.dec();

        const labels = {
            method: req.method,
            route: req.originalUrl,
            status: String(res.statusCode),
        };

        end(labels);

        httpRequestsTotal.inc(labels);
    });

    next();
};

export default metricsMiddleware;