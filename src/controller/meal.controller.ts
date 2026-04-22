import {
  createMealSev,
  getByIdSev,
  getListSev,
  updateSev,
  updateStatusSev,
} from '../service/meal.service';
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
export const getById = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) res.fail('id不能为空');
    const result = await getByIdSev(Number(req.params.id));
    res.success(result);
  } catch (e) {
    res.fail(e);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const result = await updateSev(req.body);
    if (result) {
      res.success('修改成功');
    } else {
      res.fail('修改失败');
    }
  } catch (e) {
    res.fail(e);
  }
};

// 启用/停用
export const updateStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.query.id);
    const status = Number(req.params.status);
    if (isNaN(id) || isNaN(status)) res.fail('参数错误');
    const result = await updateStatusSev(id, status);
    if (result) {
      res.success('修改成功');
    }
  } catch (e) {
    res.fail(e);
  }
};
//新增套餐
export const createMeal = async (req: Request, res: Response) => {
  try {
    const result = await createMealSev(String(req.headers.token || ''), req.body);
    if (result) res.success('添加成功');
    else res.fail('添加失败');
  } catch (e) {
    res.fail(e);
  }
};
