import { Request, Response } from 'express';
import {
  confirmOrderSev,
  detailByIdSev,
  rejectOrderSev,
  searchSev,
  statisticsSev,
} from '../service/orders.service';

export const search = async (req: Request, res: Response) => {
  try {
    const { beginTime, endTime, number, page, pageSize, phone, status, useId } = req.query;
    const data = {
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 10,
      beginTime: beginTime ? String(beginTime) : undefined,
      endTime: endTime ? String(endTime) : undefined,
      number: number ? String(number) : undefined,
      phone: phone ? String(phone) : undefined,
      status: status ? Number(status) : undefined,
      useId: useId ? Number(useId) : undefined,
    };
    const result = await searchSev(data);
    res.success(result);
  } catch (e) {
    res.fail(e);
  }
};
//detail
export const orderDetail = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await detailByIdSev(id);
    if (!id || !result) return res.fail('不存在');
    res.success(result);
  } catch (e) {
    res.fail(e);
  }
};
export const statistics = async (req: Request, res: Response) => {
  try {
    res.success(await statisticsSev());
  } catch (e) {
    res.fail(e);
  }
};
export const confirmOrder = async (req: Request, res: Response) => {
  try {
    const id = Number(req.body.id);

    if (isNaN(id)) throw '参数错误';
    const result = await confirmOrderSev(id);
    if (!result) return res.fail('修改失败');
    res.success();
  } catch (e) {
    res.fail(e);
  }
};
export const rejectOrder = async (req: Request, res: Response) => {
  try {
    const id = Number(req.body.id);
    const rejectionReason = String(req.body.rejectionReason);
    if (isNaN(id) || !rejectionReason) throw '参数错误';
    const result = await rejectOrderSev({ id, rejectionReason });
    if (!result) return res.fail('修改失败');
    res.success();
  } catch (e) {
    res.fail(e);
  }
};
