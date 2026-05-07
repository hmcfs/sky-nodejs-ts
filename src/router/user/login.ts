import { Router } from 'express';
import { login } from '../../controller/user/login.controller';

const router = Router();
router.post('/user/login', login);
export default router;
