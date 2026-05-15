import { Request, Response } from 'express';
import { getHisOrderSev, getOrderByIdSev } from '../../service/user/order.service';

export const getHisOrder = async (req: Request, res: Response) => {
  try {
    const token = String(req.headers.authentication);
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const status = Number(req.query.status) || undefined;
    if (isNaN(page) || isNaN(pageSize)) res.fail('参数错误');
    const result = await getHisOrderSev({ page, pageSize, status }, token);
    res.success(result);
  } catch (e) {
    res.fail(e);
  }
};
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) res.fail('参数错误');
    res.success(await getOrderByIdSev(id));
  } catch (e) {
    res.fail(e);
  }
};
