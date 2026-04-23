import * as dishSev from '../service/dish.service';
import { Request, Response } from 'express';
import { DishPage, DishUpdate } from '../types/dish.type';
//
export const getByCategoryId = async (req: Request, res: Response) => {
  try {
    const categoryId = Number(req.query.categoryId || NaN);
    if (categoryId === undefined || isNaN(categoryId)) {
      return res.fail('categoryId参数错误', 400);
    }
    const result = await dishSev.getByCategoryIdSev(categoryId);
    res.success(result);
  } catch (err) {
    res.fail(err);
  }
};
// 查询所有菜品  分页+条件
export const getList = async (req: Request, res: Response) => {
  try {
    const { page, pageSize, status, name, categoryId }: DishPage = req.query;
    const data = {
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
      status: status ? Number(status) : undefined,
      name: name ? String(name).trim() : undefined,
      categoryId: categoryId ? Number(categoryId) : undefined,
    };
    const result = await dishSev.getListSev(data);
    res.success(result);
  } catch (e) {
    res.fail(e);
  }
};
//id 查询
export const getById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id || '');
    if (isNaN(id)) return res.fail('id参数错误', 400);
    const result = await dishSev.getByIdSev(id);
    res.success(result);
  } catch (e) {
    res.fail(e);
  }
};
//修改
export const update = async (req: Request, res: Response) => {
  try {
    const result = await dishSev.updateSev(String(req.headers.token ?? ''), req.body as DishUpdate);
    if (result) {
      res.success('修改成功');
    } else {
      res.fail('修改失败');
    }
  } catch (e) {
    res.fail(e);
  }
};
//起售/停售
export const updateStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.query.id);
    const status = Number(req.params.status);
    if (id === undefined || isNaN(id) || status === undefined || isNaN(status)) {
      return res.fail('参数错误');
    }

    await dishSev.updateStatusSev(String(req.headers.token ?? ''), id, status);
    res.success();
  } catch (e) {
    res.fail(e);
  }
};
