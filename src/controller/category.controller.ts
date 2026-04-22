import { Request, Response } from 'express';
import {
  getListSev,
  addSev,
  updateSev,
  deleteSev,
  getMealCategorySev,
} from '../service/category.service';
import type { CategoryPage, CategoryCreate } from '../types/category.type';
import { getUserId } from '../utils/jwt';
import type { UpdateParams } from '../types/category.type';
//条件查询
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
//修改
export const update = async (req: Request, res: Response) => {
  try {
    const [affectedCount] = await updateSev(
      String(req.headers.token || ''),
      req.body as UpdateParams
    );
    if (affectedCount > 0) res.success({ affectedCount });
    else res.fail('数据未发生更改');
  } catch (e) {
    res.fail(e);
  }
};
//新增
export const add = async (req: Request, res: Response) => {
  try {
    const result = await addSev(String(req.headers.token) || '', req.body as CategoryCreate);
    if (result) {
      res.success();
    } else res.fail('数据添加失败');
  } catch (e) {
    res.fail(e);
  }
};
// 删除
export const del = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    if (!id) res.fail('id不能为空');
    const affectedCount = await deleteSev(Number(id));
    if (affectedCount > 0) res.success({ affectedCount });
  } catch (e) {
    res.fail(e);
  }
};
//查询分类的套餐
export const getMealCategory = async (req: Request, res: Response) => {
  try {
    const { type } = req.query;
    const result = await getMealCategorySev(type ? Number(type) : undefined);
    res.success(result);
  } catch (e) {
    res.fail(e);
  }
};
