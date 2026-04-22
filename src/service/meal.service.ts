import MealModel from '../models/meal.model';
import CategoryModel from '../models/category.model';
import MealDishModel from '../models/mealDish.model';
import type { MealPage, MealQueryRes, MealUpdate } from '../types/meal.type';
import { Op, Transaction } from 'sequelize';
import sequelize from '../db/sequelize';
import { getUserId } from '../utils/jwt';
// 分页查询 +条件查询
export const getListSev = async (data: MealPage) => {
  const { page, pageSize, status, name, categoryId } = data;
  const offset = (page - 1) * pageSize;
  const where: any = {};
  if (status !== undefined) where.status = status;
  if (categoryId !== undefined) where.categoryId = categoryId;
  if (name) where.name = { [Op.like]: `%${name}%` };
  const result: { count: number; rows: MealQueryRes[] } = await MealModel.findAndCountAll({
    where,
    limit: pageSize,
    offset,
    order: [['createTime', 'DESC']],
    include: [
      {
        model: CategoryModel,
        as: 'category',
        attributes: ['id', 'name'],
      },
    ],
  });

  return {
    total: result.count,
    records: result.rows.map(i => {
      const data = i as any;
      const { category, ...rest } = data.toJSON();
      return { ...rest, categoryName: category?.name || '' };
    }),
  };
};
//id查询
export const getByIdSev = async (id: number) => {
  const res = await MealModel.findByPk(id, {
    include: [
      {
        model: CategoryModel,
        as: 'category',
        attributes: [['id', 'categoryId'], 'name'],
      },
      {
        model: MealDishModel,
        as: 'mealDish',
        attributes: ['id', 'name', 'price', 'copies', 'dishId', 'setmealId'],
      },
    ],
  });
  const { category, mealDish, ...result } = res?.toJSON() || {};
  return {
    ...result,
    ...category,
    setmealDishes: mealDish || [],
  };
};
//修改套餐

export const updateSev = async (data: MealUpdate) => {
  const t: Transaction = await sequelize.transaction();
  try {
    const { id, setmealDishes, ...rest } = data;
    rest.price = Number(rest.price) || -1;
    const updateRes = await MealModel.update(rest, { where: { id: data.id }, transaction: t });
    await MealDishModel.destroy({ where: { setmealId: data.id }, transaction: t });
    if (setmealDishes && setmealDishes.length > 0) {
      const insert = setmealDishes.map(i => {
        i.price = Number(i.price) || -1;
        return { ...i, setmealId: data.id };
      });
      await MealDishModel.bulkCreate(insert, { transaction: t });
    }

    await t.commit();
    return true;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

//启用/停用套餐
export const updateStatusSev = async (id: number, status: number) => {
  const [affctedCount] = await MealModel.update({ status }, { where: { id } });
  return affctedCount > 0;
};
//新增套餐
export const createMealSev = async (token: string, data: MealUpdate) => {
  const transaction: Transaction = await sequelize.transaction();
  try {
    const userId = getUserId(token);
    data.createUser = userId!;
    data.updateUser = userId!;
    const { setmealDishes, ...rest } = data;
    if (!setmealDishes || setmealDishes.length === 0) throw new Error(' 套餐菜品不能为空');
    const result = await MealModel.create(rest, { transaction });

    const setmealDishes2 = setmealDishes.map(i => {
      return { ...i, setmealId: result.id };
    });
    await MealDishModel.bulkCreate(setmealDishes2, { transaction });
    await transaction.commit();
    return result;
  } catch (e) {
    await transaction.rollback();
    throw e;
  }
};
