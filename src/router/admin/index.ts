import loginRouter from './login';
import { Router } from 'express';
const adminRouter = Router();
adminRouter.use(loginRouter);
export default adminRouter;
