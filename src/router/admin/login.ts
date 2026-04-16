import { Router } from 'express';
import { login, logout } from '../../controller/login.controller';
const router = Router();
router.post('/employee/login', login);
router.post('/employee/logout', logout);
export default router;
