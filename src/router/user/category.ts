import { Router } from 'express';
import { getMealCategory } from '../../controller/category.controller';

const categoryRouter = Router();

categoryRouter.get('/list', getMealCategory);
export default categoryRouter;
