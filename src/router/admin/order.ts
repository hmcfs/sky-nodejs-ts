import { Router } from 'express';
import * as orders from '../../controller/orders.controller';

const router = Router();
router.get('/conditionSearch', orders.search);
router.get('/statistics', orders.statistics);
router.get('/details/:id', orders.orderDetail);
export default router;
