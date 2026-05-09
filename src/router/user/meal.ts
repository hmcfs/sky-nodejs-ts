import { Router } from 'express';
import { getDishById, getMealList } from '../../controller/user/meal.controller';

const mealRouter = Router();
mealRouter.get('/list', getMealList);
mealRouter.get('/dish/:id', getDishById);
export default mealRouter;
