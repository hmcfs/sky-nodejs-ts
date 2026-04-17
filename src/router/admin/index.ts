import loginRouter from './login';
import { Router } from 'express';
import employeeRouter from './employee';
const adminRouter = Router();
adminRouter.use(loginRouter);
adminRouter.use(employeeRouter);
export default adminRouter;
