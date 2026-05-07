import { Router } from 'express';
import { userAuthMiddleware } from '../../middleware/auth.middleware';
import loginRouter from './login';
import categoryRouter from './category';

const router = Router();
router.use(loginRouter);
router.use(userAuthMiddleware);
router.use('/category', categoryRouter);
export default router;
