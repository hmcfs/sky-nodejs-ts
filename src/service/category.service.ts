import { QueryTypes } from 'sequelize';
import sequelize from '../db/sequelize';
import CategoryModel from '../models/category.model';
import type { CategoryPage, QueryResult, QueryResult2 } from '../types/category.type';
import type { PageResult } from '../types/global.type';
import dateFormat from '../utils/dateFormat';
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
    sql = `select * from category where name like ? and type = ? limit ? offset ?`;
    params = [`%${name2}%`, categoryType, pageSize, offset];
    sql2 = `select count(*) as total from category where name like ? and type = ?`;
    params2 = [`%${name2}%`, categoryType];
  } else if (name2) {
    sql = `select * from category where name like ? limit ? offset ?`;
    params = [`%${name2}%`, pageSize, offset];
    sql2 = `select count(*) as total from category where name like ?`;
    params2 = [`%${name2}%`];
  } else if (categoryType !== undefined) {
    sql = `select * from category where type = ? limit ? offset ?`;
    params = [categoryType, pageSize, offset];
    sql2 = `select count(*) as total from category where type = ?`;
    params2 = [categoryType];
  } else {
    sql = `select * from category limit ? offset ?`;
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
