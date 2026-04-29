import {
  ordersStatisticsSev,
  topSev,
  turnOverSev,
  userStatisticsSev,
} from '../service/report.service';
import { Request, Response } from 'express';

export const ordersStatistics = async (req: Request, res: Response) => {
  try {
    const { end, begin } = req.query;
    res.success(await ordersStatisticsSev(String(begin), String(end)));
  } catch (e) {
    res.fail(e);
  }
};
export const Top = async (req: Request, res: Response) => {
  try {
    const { end, begin } = req.query;
    res.success(await topSev(String(begin), String(end)));
  } catch (e) {
    res.fail(e);
  }
};
export const turnOver = async (req: Request, res: Response) => {
  try {
    const { end, begin } = req.query;
    res.success(await turnOverSev(String(begin), String(end)));
  } catch (e) {
    res.fail(e);
  }
};
export const userStatistics = async (req: Request, res: Response) => {
  try {
    const { end, begin } = req.query;
    res.success(await userStatisticsSev(String(begin), String(end)));
  } catch (e) {
    res.fail(e);
  }
};
