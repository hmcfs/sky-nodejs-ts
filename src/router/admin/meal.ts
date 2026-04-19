import { Router } from 'express';
import { getList } from '../../controller/meal.controller';
const router = Router();
router.get('/', getList);

export default router;
