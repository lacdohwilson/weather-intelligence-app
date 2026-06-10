import { Router } from 'express';
import metricsController from './metrics.controller.js';

const router = Router();

router.get('/metrics', metricsController.getMetrics);

export default router;
