import { Router } from 'express';
import {
  getEmployeeList,
  add,
  update,
  getById,
  disable,
} from '../../controller/employee.controller';
const router = Router();
router.get('/employee/page', getEmployeeList);
router.post('/employee', add);
router.put('/employee', update);
router.get('/employee/:id', getById);
router.post('/employee/status/:status', disable);
export default router;
