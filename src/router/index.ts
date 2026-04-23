import { Router } from 'express';
import adminRouter from './admin/index';
import userRouter from './user/index';
import commonRouter from './common/index';

const router = Router();
router.use(commonRouter);
router.use('/admin', adminRouter);
router.use('/user', userRouter);
export default router;
