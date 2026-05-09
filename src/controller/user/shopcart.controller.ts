import { Request, Response } from 'express';
import {
  addCartSev,
  clearCartSev,
  getCartlistSev,
  subtractCartSev,
} from '../../service/user/shopcart.service';

export const addCart = async (req: Request, res: Response) => {
  try {
    const result = await addCartSev(req.body, String(req.headers.authentication));
    if (result) res.success(result);
    else res.fail('添加失败');
  } catch (e) {
    res.fail(e);
  }
};
export const getCartList = async (req: Request, res: Response) => {
  try {
    const result = await getCartlistSev();
    res.success(result);
  } catch (e) {
    res.fail(e);
  }
};
export const subtractCart = async (req: Request, res: Response) => {
  try {
    const dishId = Number(req.body.dishId);
    const setmealId = Number(req.body.setmealId);
    if (isNaN(dishId) && isNaN(setmealId)) res.fail('参数错误');
    const result = await subtractCartSev({
      dishId,
      setmealId,
      dishFlavor: String(req.body.dishFlavor),
    });
    if (result) res.success(result);
    else res.fail('删除失败');
  } catch (e) {
    res.fail(e);
  }
};
export const clearCart = async (req: Request, res: Response) => {
  try {
    const result = await clearCartSev(String(req.headers.authentication!));
    if (result) res.success(result);
    else res.fail('清空失败');
  } catch (e) {
    res.fail(e);
  }
};
