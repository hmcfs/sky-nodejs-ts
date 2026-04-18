import { Request, Response } from 'express';
import { getListSev } from '../service/category.service';
import type { CategoryPage } from '../types/category.type';
export const getList = async (req: Request, res: Response) => {
  try {
    const { page, pageSize, name, type } = req.query;
    const result = await getListSev({
      page: Number(page || 1),
      pageSize: Number(pageSize || 10),
      name,
      type,
    } as CategoryPage);
    res.success(result);
  } catch (e) {
    res.fail(e);
  }
};
