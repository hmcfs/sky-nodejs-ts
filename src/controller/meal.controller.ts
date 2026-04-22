import { getListSev } from '../service/meal.service';
import { Request, Response } from 'express';
export const getList = async (req: Request, res: Response) => {
  try {
    const result = await getListSev();
    res.success(result);
  } catch (e) {
    res.fail(e);
  }
};
