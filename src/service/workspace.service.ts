import pool from '../db/mysql';
import { RowDataPacket } from 'mysql2';

interface BusinessData extends RowDataPacket {
  count?: number;
  total?: number;
  amount?: number;
  validTotal?: number;
  date?: Date;
}

interface OrdersData extends RowDataPacket {
  count: number;
  status: number;
}

interface DishesData extends OrdersData {}

type SetmealData = RowDataPacket & {
  discontinued: number;
  sold: number;
};
export const businessDataSev = async () => {
  const userSql = `select COUNT(*) as count, DATE (create_time) as date
                   from employee

                   group by date`;
  const completionSql = `select count(*) as                                 total,
                                sum(case when status = 5 then 1 else 0 end) validTotal
                         from orders
  `;
  const turnoverSql = `select sum(od.amount) as amount
                       from order_detail od
                                join orders o on o.id = od.order_id
                           and status = 5`;

  const [[userRows], [completionRows], [turnoverRows]] = await Promise.all([
    pool.query<BusinessData[]>(userSql),
    pool.query<BusinessData[]>(completionSql),
    pool.query<BusinessData[]>(turnoverSql),
  ]);

  return {
    newUsers: userRows[0]?.count ?? 0,
    orderCompletionRate: completionRows[0].total
      ? (completionRows[0].validTotal ?? 0) / completionRows[0].total
      : 0,
    turnover: turnoverRows[0].amount ?? 0,
    unitPrice: completionRows[0].validTotal
      ? ((turnoverRows[0].amount ?? 0) / (completionRows[0].validTotal ?? 0)).toFixed(2)
      : 0,
    validOrderCount: completionRows[0].validTotal ?? 0,
  };
};
export const ordersSev = async () => {
  const sql = `select status, count(*) count
               from orders
               group by status`;
  const [rows] = await pool.query<OrdersData[]>(sql);
  const result: Record<string, number> = {
    allOrders: 0,
    cancelledOrders: 0,
    completedOrders: 0,
    deliveredOrders: 0,
    waitingOrders: 0,
  };
  if (rows.length > 0) {
    rows.forEach(i => {
      if (i.status === 6) result.cancelledOrders = i.count;
      if (i.status === 5) result.completedOrders = i.count;
      if (i.status === 4) result.deliveredOrders = i.count;
      if (i.status === 3) result.waitingOrders = i.count;
    });
    result.allOrders =
      result.cancelledOrders +
      result.completedOrders +
      result.deliveredOrders +
      result.waitingOrders;
  }
  return result;
};
export const dishesSev = async () => {
  const [rows] = await pool.query<DishesData[]>(`select count(*) count,status
                                                 from dish
                                                 group by status`);
  let discontinued = 0;
  let sold = 0;
  rows.forEach(i => {
    if (i.status === 0) discontinued = i.count;
    else if (i.status === 1) sold = i.count;
  });
  return {
    discontinued,
    sold,
  };
};
export const setmealSev = async () => {
  const [rows] = await pool.query<SetmealData[]>(`select sum(case
                                                                 when status = 1 then 1
                                                                 else 0 end) as sold,
                                                         sum(case
                                                                 when status = 0 then 1
                                                                 else 0
                                                             end)               discontinued
                                                  from setmeal`);
  const { sold, discontinued } = rows[0];
  return rows.length > 0 ? { sold, discontinued } : {};
};
