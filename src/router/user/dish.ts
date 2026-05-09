import * as dishCtrl from '../../controller/dish.controller';
import { Router } from 'express';

const dishRouter = Router();
dishRouter.get('/list', dishCtrl.getByCategoryId);
export default dishRouter;
