import { Request, Response } from 'express';
import { businessDataSev, dishesSev, ordersSev, setmealSev } from '../service/workspace.service';

export const businessData = async (req: Request, res: Response) => {
  try {
    return res.success(await businessDataSev());
  } catch (e) {
    res.fail(e);
  }
};
export const orders = async (req: Request, res: Response) => {
  try {
    return res.success(await ordersSev());
  } catch (e) {
    res.fail(e);
  }
};
export const dishes = async (req: Request, res: Response) => {
  try {
    return res.success(await dishesSev());
  } catch (e) {
    res.fail(e);
  }
};
export const setmeal = async (req: Request, res: Response) => {
  try {
    return res.success(await setmealSev());
  } catch (e) {
    res.fail(e);
  }
};
