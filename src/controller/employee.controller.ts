import {
  getEmployeeListSev,
  getByIdSev,
  addSev,
  updateSev,
  disableSev,
} from '../service/employee.service';
import { Request, Response } from 'express';
import type { EmployeeResult } from '../types/employee.type';
import { ca } from 'zod/locales';
// 获取员工列表
export const getEmployeeList = async (req: Request, res: Response) => {
  try {
    const { page, pageSize } = req.query;
    let result: EmployeeResult;

    if (req.query.name as string) {
      result = await getEmployeeListSev(
        Number(page) || 1,
        Number(pageSize || 10),
        req.query.name as string
      );
    } else result = await getEmployeeListSev(Number(page) || 1, Number(pageSize || 10));
    res.success(result);
  } catch (e) {
    res.fail(e);
  }
};
//id查询
export const getById = async (req: Request, res: Response) => {
  try {
    const result = await getByIdSev(String(req.params.id || ''));
    res.success(result);
  } catch (e) {
    res.fail(e);
  }
};
// 添加员工
export const add = async (req: Request, res: Response) => {
  try {
    const result = await addSev(req.body);
    res.success(result);
  } catch (e) {
    res.fail(e);
  }
};
// 修改员工
export const update = async (req: Request, res: Response) => {
  try {
    const result = await updateSev(req.body);
    if (result.affectedRows > 0) {
      res.success(result);
    } else {
      res.fail('数据未更改');
    }
  } catch (e) {
    res.fail(e);
  }
};
//禁用员工
export const disable = async (req: Request, res: Response) => {
  try {
    if ((await disableSev(Number(req.params.status), Number(req.query.id))).affectedRows === 0)
      res.fail('禁用失败');
    res.success({});
  } catch (e) {
    res.fail(e);
  }
};
