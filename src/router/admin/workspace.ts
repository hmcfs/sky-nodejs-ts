import { Router } from 'express';
import * as work from '../../controller/workspace.controller';

const router = Router();
router.get('/businessData', work.businessData);
router.get('/overviewOrders', work.orders);
router.get('/overviewDishes', work.dishes);
router.get('/overviewSetmeals', work.setmeal);
export default router;
