import { addCart, getCartList, subtractCart } from '../../controller/user/shopcart.controller';
import { Router } from 'express';

const cartRouter = Router();
cartRouter.post('/add', addCart);
cartRouter.get('/list', getCartList);
cartRouter.post('/sub', subtractCart);
export default cartRouter;
