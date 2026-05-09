import { Request, Response } from 'express';
import { getDishByIdSev, getMealListSev } from '../../service/user/meal.service';

export const getMealList = async (req: Request, res: Response) => {
  try {
    res.success(await getMealListSev());
  } catch (e) {
    res.fail(e);
  }
};
export const getDishById = async (req: Request, res: Response) => {
  try {
    res.success(await getDishByIdSev(Number(req.params.id)));
  } catch (e) {
    res.fail(e);
  }
};
