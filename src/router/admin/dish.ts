import { Router } from 'express';
import * as dishCtrl from '../../controller/dish.controller';

const router = Router();
router.get('/list', dishCtrl.getByCategoryId);
router.get('/page', dishCtrl.getList);
router.get('/:id', dishCtrl.getById);
router.put('/', dishCtrl.update);
router.post('/status/:status', dishCtrl.updateStatus);
export default router;
