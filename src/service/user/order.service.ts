import OrdersModel from '../../models/orders.model';
import OrderDetailModel from '../../models/orderDetail.model';
import { getUserId } from '../../utils/jwt';
import UserModel from '../../models/user/user.model';

type HisOrder = {
  page: number;
  pageSize: number;
  status?: number;
};
export const getHisOrderSev = async (data: HisOrder, token: string) => {
  const openid = getUserId(token);
  const limit = data.pageSize;
  const offset = (data.page - 1) * limit;
  const userId = (await UserModel.findOne({ where: { openid: openid! } }))!.id;
  const where = {
    userId,
    ...(data.status && { status: data.status }),
  };
  const { rows, count } = await OrdersModel.findAndCountAll({
    where,
    limit,
    offset,
    order: [['orderTime', 'DESC']],
    include: [
      {
        model: OrderDetailModel,
        as: 'orderDetails',
      },
    ],
  });
  const records = rows.map(i => {
    const { orderDetails, ...rest } = i.toJSON();
    return {
      ...rest,
      orderDetailList: orderDetails,
    };
  });

  return {
    records,
    total: count,
  };
};
export const getOrderByIdSev = async (id: number) => {
  const rows = await OrdersModel.findOne({
    where: { id },
    include: [
      {
        model: OrderDetailModel,
        as: 'orderDetails',
      },
    ],
  });
  if (!rows) return {};
  const { orderDetails, ...rest } = rows.toJSON();
  return {
    ...rest,
    orderDetailList: orderDetails,
  };
};
