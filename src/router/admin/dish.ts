import { Router } from 'express';
import * as dishCtrl from '../../controller/dish.controller';
const router = Router();
router.get('/list', dishCtrl.getByCategoryId);
export default router;
