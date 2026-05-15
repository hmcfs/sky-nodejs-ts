import { Router } from 'express';
import * as order from '../../controller/user/order.controller';

const orderRouter = Router();
orderRouter.get('/historyOrders', order.getHisOrder);
orderRouter.get('/orderDetail/:id', order.getOrderById);
export default orderRouter;
