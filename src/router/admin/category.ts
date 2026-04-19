import { Router } from 'express';
import { getList, update, add, del } from '../../controller/category.controller';

const categoryRouter = Router();
categoryRouter.get('/page', getList);
categoryRouter.put('/', update);
categoryRouter.post('/', add);
categoryRouter.delete('/', del);
export default categoryRouter;
