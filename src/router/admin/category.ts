import { Router } from 'express';
import { add, del, getList, getMealCategory, update } from '../../controller/category.controller';

const categoryRouter = Router();
categoryRouter.get('/page', getList);
categoryRouter.put('/', update);
categoryRouter.post('/', add);
categoryRouter.delete('/', del);
categoryRouter.get('/list', getMealCategory);
export default categoryRouter;
