import { httpRequestDuration } from './metrics.js';

const metricsMiddleware = (req, res, next) => {
    const end = httpRequestDuration.startTimer();

    res.on('finish', () => {
        end({
            method: req.method,
            route: req.originalUrl,
            code: res.statusCode,
        });
    });

    next();
};

export default metricsMiddleware;