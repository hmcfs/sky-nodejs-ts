import { Router } from 'express';
import * as meal from '../../controller/meal.controller';

const router = Router();

router.get('/page', meal.getList);
router.get('/:id', meal.getById);
router.post('/', meal.createMeal);
router.put('/', meal.update);
router.post('/status/:status', meal.updateStatus);
router.delete('/', meal.delMeal);
export default router;
