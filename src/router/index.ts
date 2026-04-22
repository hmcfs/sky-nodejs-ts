import { Router } from 'express';
import adminRouter from './admin/index';
import userRouter from './user/index';
import commonRouter from './common/upload';

const router = Router();
/**
 * @tags 管理员模块
 * @description 管理员相关接口
 */
router.use('/admin', adminRouter);
/**
 * @tags 用户模块
 * @description 用户相关接口
 */

router.use('/user', userRouter);
router.use(commonRouter);
export default router;
