import { QueryTypes } from 'sequelize';
import sequelize from '../db/sequelize';
import CategoryModel from '../models/category.model';
import type {
  CategoryPage,
  QueryResult,
  QueryResult2,
  UpdateParams,
  CategoryCreate,
} from '../types/category.type';
import type { PageResult } from '../types/global.type';
import dateFormat from '../utils/dateFormat';
import { getUserId } from '../utils/jwt';
//查询所有+分页+条件查询
export const getListSev = async (data: CategoryPage) => {
  const { page = 1, pageSize = 10, name, type: categoryType } = data;
  const offset = (page - 1) * pageSize;
  let sql: string;
  let params: (string | number)[];
  let sql2: string;
  let params2: (string | number)[];
  const name2 = name?.trim();
  if (name2 && categoryType !== undefined) {
    sql = `select * from category where name like ? and type = ? order by sort asc limit ? offset ? `;
    params = [`%${name2}%`, categoryType, pageSize, offset];
    sql2 = `select count(*) as total from category where name like ? and type = ?`;
    params2 = [`%${name2}%`, categoryType];
  } else if (name2) {
    sql = `select * from category where name like ? order by sort asc limit ? offset ?`;
    params = [`%${name2}%`, pageSize, offset];
    sql2 = `select count(*) as total from category where name like ?`;
    params2 = [`%${name2}%`];
  } else if (categoryType !== undefined) {
    sql = `select * from category where type = ? order by sort asc limit ? offset ?`;
    params = [categoryType, pageSize, offset];
    sql2 = `select count(*) as total from category where type = ?`;
    params2 = [categoryType];
  } else {
    sql = `select * from category order by sort asc limit ? offset ?`;
    params = [pageSize, offset];
    sql2 = `select count(*) as total from category`;
    params2 = [];
  }

  const records = await sequelize.query<QueryResult>(sql, {
    replacements: params,
    type: QueryTypes.SELECT,
  });

  /*   const [t] = await sequelize.query<{ total: number }[]>(
    sql2,
    params.length > 0
      ? { replacements: params2, type: QueryTypes.SELECT }
      : { type: QueryTypes.SELECT }
  ); */
  let t: { total: number };

  // 有参数 → 带 replacements
  if (params2.length) {
    [t] = await sequelize.query<{ total: number }>(sql2, {
      replacements: params2,
      type: QueryTypes.SELECT,
    });
  }
  // 无参数 → 不带 replacements
  else {
    [t] = await sequelize.query<{ total: number }>(sql2, {
      type: QueryTypes.SELECT,
    });
  }

  return {
    total: t.total || 0,
    records:
      records?.map(i => {
        const { create_time, update_time, ...res } = i;
        return { ...res, createTime: dateFormat(create_time), updateTime: dateFormat(update_time) };
      }) || [],
  } as PageResult<QueryResult2>;
};
//修改
export const updateSev = async (token: string, data: UpdateParams) => {
  data = {
    ...data,
    update_user: Number(getUserId(token)),
  };
  return await CategoryModel.update(data, { where: { id: data.id } });
};
//新增
export const addSev = async (token: string, data: CategoryCreate) => {
  const id = getUserId(token);
  data = {
    ...data,

    create_user: id,
    update_user: id,
  } as CategoryCreate;
  return await CategoryModel.create(data);
};
//删除
export const deleteSev = async (id: number) => {
  id = Number(id);
  return await CategoryModel.destroy({ where: { id } });
};
//查询分类的套餐
