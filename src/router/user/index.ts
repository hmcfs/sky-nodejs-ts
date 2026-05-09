import { Router } from 'express';
import { userAuthMiddleware } from '../../middleware/auth.middleware';
import loginRouter from './login';
import categoryRouter from './category';
import mealRouter from './meal';
import dishRouter from './dish';
import cartRouter from './shopcart';

const router = Router();
router.use(loginRouter);
router.use(userAuthMiddleware);
router.use('/category', categoryRouter);
router.use('/setmeal', mealRouter);
router.use('/dish', dishRouter);
router.use('/shoppingCart', cartRouter);
export default router;
