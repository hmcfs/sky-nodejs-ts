import {
  addCart,
  clearCart,
  getCartList,
  subtractCart,
} from '../../controller/user/shopcart.controller';
import { Router } from 'express';

const cartRouter = Router();
cartRouter.post('/add', addCart);
cartRouter.get('/list', getCartList);
cartRouter.post('/sub', subtractCart);
cartRouter.delete('/clean', clearCart);
export default cartRouter;
