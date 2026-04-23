import DishModel from '../models/dish.model';
import CategoryModel from '../models/category.model';
import { DishAttribute, DishPage, DishUpdate } from '../types/dish.type';
import { Op, Transaction } from 'sequelize';
import { PageResult } from '../types/global.type';
import FlavorModel from '../models/flavor.model';
import sequelize from '../db/sequelize';
import { getUserId } from '../utils/jwt';

export const getByCategoryIdSev = async (id: number) => {
  return await DishModel.findAll({
    where: { categoryId: id },

    include: [
      {
        model: CategoryModel,
        as: 'category',
      },
    ],
  });
};

// 查询所有菜品  分页+条件
export const getListSev = async (params: DishPage) => {
  const { page = 1, pageSize = 10, status, name, categoryId } = params;
  const name2 = name?.trim();
  const offset = (page - 1) * pageSize;
  const where: any = {
    ...(status !== undefined && { status }),
    ...(categoryId !== undefined && { categoryId }),
    ...(name2 && { name: { [Op.like]: `%${name2}%` } }),
  };

  const { rows, count } = await DishModel.findAndCountAll({
    where,
    limit: pageSize,
    offset,
    include: [
      {
        model: CategoryModel,
        as: 'category',
        attributes: [
          ['id', 'categoryId'],
          ['name', 'categoryName'],
        ],
      },
    ],
  });
  const records = rows.map(i => {
    const { category, ...rest } = i.toJSON();
    return { ...category, ...rest };
  });
  return { total: count, records } as PageResult<DishAttribute>;
};
//id 查询
export const getByIdSev = async (id: number) => {
  const result = await DishModel.findOne({
    where: { id },
    include: [
      {
        model: CategoryModel,
        as: 'category',
        attributes: [
          ['id', 'categoryId'],
          ['name', 'categoryName'],
        ],
      },
      {
        model: FlavorModel,
        as: 'flavors',
      },
    ],
  });
  if (!result) return {};
  const { category, ...rest } = result.toJSON();
  return { ...category, ...rest };
};
//修改
export const updateSev = async (token: string, data: DishUpdate) => {
  const transaction: Transaction = await sequelize.transaction();
  try {
    const userId = getUserId(token);
    data.updateUser = userId!;
    const { flavors, ...rest } = data;
    const flavors2 = flavors.map(i => {
      return { ...i, dishId: rest.id };
    });
    await DishModel.update(rest, {
      where: { id: rest.id },
      transaction,
    });
    await FlavorModel.destroy({ where: { dishId: rest.id }, transaction });
    if (flavors2 && flavors2.length > 0) await FlavorModel.bulkCreate(flavors2, { transaction });
    await transaction.commit();
    return true;
  } catch (e) {
    await transaction.rollback();
    throw e;
  }
};
//起售/停售
export const updateStatusSev = async (token: string, id: number, status: number) => {
  const userId = getUserId(token);
  const [count] = await DishModel.update({ status, updateUser: userId! }, { where: { id } });
  return count > 0;
};
