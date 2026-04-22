import { Router } from 'express';
import { getList, update, add, del, getMealCategory } from '../../controller/category.controller';

const categoryRouter = Router();
categoryRouter.get('/page', getList);
categoryRouter.put('/', update);
categoryRouter.post('/', add);
categoryRouter.delete('/', del);
categoryRouter.get('/list', getMealCategory);
export default categoryRouter;
