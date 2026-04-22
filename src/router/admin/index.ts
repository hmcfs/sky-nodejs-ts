import loginRouter from './login';
import { Router } from 'express';
import employeeRouter from './employee';
import categoryRouter from './category';
import mealRouter from './meal';
import { authMiddleware } from '../../middleware/auth.middleware';

const adminRouter = Router();
adminRouter.use(loginRouter);
adminRouter.use(authMiddleware);
adminRouter.use(employeeRouter);
adminRouter.use('/category', categoryRouter);
adminRouter.use('/meal', mealRouter);
export default adminRouter;
