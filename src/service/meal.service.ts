import MealModel from '../models/meal.model';
import type { MealPage, Meal } from '../types/meal.type';
import { Op } from 'sequelize';
export const getListSev = async (data: MealPage) => {
  const { page, pageSize, status, name, categoryId } = data;
  const offset = (page - 1) * pageSize;
  const where: any = {};
  if (status !== undefined) where.status = status;
  if (categoryId !== undefined) where.categoryId = categoryId;
  if (name) where.name = { [Op.like]: `%${name}%` };
  const result: { count: number; rows: Meal[] } = await MealModel.findAndCountAll({
    where,
    limit: pageSize,
    offset,
    order: [['createTime', 'DESC']],
  });
  return { total: result.count, records: result.rows };
};
