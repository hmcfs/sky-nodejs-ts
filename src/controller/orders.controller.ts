import { Request, Response } from 'express';
import { searchSev, statisticsSev } from '../service/orders.service';

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
    console.log('result', result);
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
