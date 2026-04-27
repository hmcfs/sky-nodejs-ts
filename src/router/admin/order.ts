import { Router } from 'express';
import * as orders from '../../controller/orders.controller';

const router = Router();
router.get('/conditionSearch', orders.search);
router.get('/statistics', orders.statistics);
export default router;
