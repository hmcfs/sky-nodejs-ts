import { Request, Response } from 'express';
import {
  addAddressSev,
  getAddressListSev,
  getDefaultSev,
} from '../../service/user/address.service';
// 获取
export const getAddressList = async (req: Request, res: Response) => {
  try {
    const token = String(req.headers.authentication);
    res.success(await getAddressListSev(token));
  } catch (e) {
    res.fail(e);
  }
};
//default address
export const getDefaultAddress = async (req: Request, res: Response) => {
  try {
    const token = String(req.headers.authentication);
    res.success(await getDefaultSev(token));
  } catch (e) {
    res.fail(e);
  }
};
// 添加
export const addAddress = async (req: Request, res: Response) => {
  try {
    const token = String(req.headers.authentication);
    res.success(await addAddressSev(req.body, token));
  } catch (e) {
    res.fail(e);
  }
};
// 修改
export const deleteAddress = async (req: Request, res: Response) => {};
// 删除
