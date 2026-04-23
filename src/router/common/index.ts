import { Router } from 'express';
import uploadRouter from './upload';

const router = Router();
router.use(uploadRouter);
export default router;
