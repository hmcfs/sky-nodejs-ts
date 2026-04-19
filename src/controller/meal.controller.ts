import { getListSev } from '../service/meal.service';
import { Request, Response } from 'express';
export const getList = async (req: Request, res: Response) => {
  try {
    const { page, pageSize, name, categoryId, status } = req.query;
    const result = await getListSev({
      page: Number(page || 1),
      pageSize: Number(pageSize || 10),
      name: name ? String(name).trim() : undefined,
      categoryId: categoryId ? Number(categoryId) : undefined,
      status: status ? Number(status) : undefined,
    });
    res.success(result);
  } catch (e) {
    res.fail(e);
  }
};
