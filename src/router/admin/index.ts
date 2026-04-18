import loginRouter from './login';
import { Router } from 'express';
import employeeRouter from './employee';
import categoryRouter from './category';
const adminRouter = Router();
adminRouter.use(loginRouter);
adminRouter.use(employeeRouter);
adminRouter.use('/category', categoryRouter);
export default adminRouter;
