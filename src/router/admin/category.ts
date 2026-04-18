import { Router } from 'express';
import { getList } from '../../controller/category.controller';

const categoryRouter = Router();
categoryRouter.get('/page', getList);
export default categoryRouter;
