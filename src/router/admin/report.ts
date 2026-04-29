import { Router } from 'express';
import * as report from '../../controller/report.controller';

const router = Router();
router.get('/ordersStatistics', report.ordersStatistics);
router.get('/top10', report.Top);
router.get('/turnoverStatistics', report.turnOver);
router.get('/userStatistics', report.userStatistics);
export default router;
