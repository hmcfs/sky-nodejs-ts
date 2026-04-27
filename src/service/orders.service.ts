import OrdersModel from '../models/orders.model';
import { Op } from 'sequelize';

interface SearchData1 {
  beginTime: string;
  endTime: string;
  number: string;
  page: number;
  pageSize: number;
  phone: string;
  status: number;
  useId: number;
}

interface SearchData extends Partial<SearchData1> {}

export const searchSev = async (data: SearchData) => {
  const { beginTime, endTime, number, page, pageSize, phone, status, useId } = data;
  const where: any = {
    ...(status !== undefined && { status }),
    ...(useId && { useId }),
  };
  if (number !== undefined) where.number = { [Op.like]: `%${number}%` };
  if (phone !== undefined) where.phone = { [Op.like]: `%${phone}%` };
  if (beginTime && endTime) where.orderTime = { [Op.between]: [beginTime, endTime] };
  const offset = (page! - 1) * pageSize!;
  const { rows, count } = await OrdersModel.findAndCountAll({
    where,
    limit: pageSize,
    offset,
  });

  return { records: rows, total: count };
};
export const statisticsSev = async () => {
  const toBeConfirmed = await OrdersModel.count({ where: { status: 2 } });
  const confirmed = await OrdersModel.count({ where: { status: 6 } });
  const deliveryInProgress = await OrdersModel.count({ where: { status: { [Op.in]: [3, 4] } } });
  return {
    toBeConfirmed,
    confirmed,
    deliveryInProgress,
  };
};
