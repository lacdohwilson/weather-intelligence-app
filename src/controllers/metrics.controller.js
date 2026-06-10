import { register } from '../monitoring/metrics.js';
import catchAsync from '../utils/catchAsync.js';

const getMetrics = catchAsync(async (req, res, next) => {
    const metrics = await register.metrics();
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

export default {
    getMetrics,
};