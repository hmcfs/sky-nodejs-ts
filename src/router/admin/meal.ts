import { Router } from 'express';
import { createMeal, getById, getList, update } from '../../controller/meal.controller';

const router = Router();
router.get('/page', getList);
router.get('/:id', getById);
router.put('/', update);
router.post('/status/:status', update);
router.post('/', createMeal);
export default router;
