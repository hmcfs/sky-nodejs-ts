import { Router } from 'express';
import * as ad from '../../controller/user/address.controller';

const addressRouter = Router();
addressRouter.get('/list', ad.getAddressList);
addressRouter.post('/', ad.addAddress);
addressRouter.get('/default', ad.getDefaultAddress);
export default addressRouter;
