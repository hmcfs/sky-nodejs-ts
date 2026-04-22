import * as dishSev from '../service/dish.service';
import { Request, Response } from 'express';
//
export const getByCategoryId = async (req: Request, res: Response) => {
  try {
    const categoryId = Number(req.query.categoryId || NaN);
    if (categoryId === undefined || isNaN(categoryId)) {
      return res.fail('categoryId参数错误', 400);
    }
    const result = await dishSev.getByCategoryIdSev(categoryId);
    res.success(result);
  } catch (err) {
    res.fail(err);
  }
};
