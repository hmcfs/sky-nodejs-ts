import dateFormat, { isValidDate } from '../utils/dateFormat';
import OrdersModel from '../models/orders.model';
import { Op } from 'sequelize';
import pool from '../db/mysql';
import { RowDataPacket } from 'mysql2';
import dayjs from 'dayjs';

interface orderCount extends RowDataPacket {
  date: string;
  count: number;
}

interface TopDate extends RowDataPacket {
  name: string;
  count: number;
}

interface UserCount extends RowDataPacket {
  date: string;
  count: number;
}

function valid(begin: string, end: string) {
  if (!isValidDate(begin) || !isValidDate(end)) throw new Error('时间格式错误');
}

function getDateList(begin: string, end: string) {
  const list: string[] = [];
  list.push(begin);
  for (let i = 1; list[i - 1] <= end; i++) {
    list[i] = dayjs(dayjs(list[i - 1]).add(1, 'day')).format('YYYY-MM-DD');
  }
  return list.join(',');
}

export const ordersStatisticsSev = async (begin: string, end: string) => {
  valid(begin, end);
  let curStr = new Date(begin).getTime();
  const endStr = new Date(end).getTime();
  const dateList2 = [];
  for (let i = 0; curStr <= endStr; i++) {
    curStr += 24 * 60 * 60 * 1000;
    dateList2[i] = dateFormat(curStr).slice(0, 10);
  }
  const validOrderCount = await OrdersModel.count({
    where: {
      status: 5,
      orderTime: { [Op.between]: [begin, end] },
    },
  });
  const totalOrderCount = await OrdersModel.count({
    where: {
      orderTime: { [Op.between]: [begin, end] },
    },
  });
  const a = Number((validOrderCount / totalOrderCount).toFixed(5));
  const orderCompletionRate = isNaN(a) ? 0 : a;
  const sql = `select Date (order_time) as date, count (*) as count
               from orders
               where order_time between ? and ?
               group by date`;
  const [rows] = await pool.query<orderCount[]>(sql, [begin, end]);
  const sql2 = `select Date (order_time) as date, count (*) as count
                from orders
                where order_time between ? and ? and status=?
                group by date`;
  const [rows3] = await pool.query<orderCount[]>(sql2, [begin, end, 5]);
  const rows2 = rows.map(i => {
    return { date: dateFormat(i.date).slice(0, 10), count: i.count };
  });
  const rows4 = rows3.map(i => {
    return { date: dateFormat(i.date).slice(0, 10), count: i.count };
  });
  const arr: number[] = [];
  const arr2: number[] = [];
  for (let i = 0; i < dateList2.length; i++) {
    for (let j = 0; j < rows2.length; j++) {
      if (dateList2[i] === rows2[j].date) arr[i] = rows2[j].count;
      else arr[i] = 0;
    }
    for (let k = 0; k < rows3.length; k++) {
      if (dateList2[i] === rows4[k].date) arr2[i] = rows4[k].count;
      else arr2[i] = 0;
    }
  }
  const orderCountList = arr.join(',');
  const validOrderCountList = arr2.join(',');
  const dateList = dateList2.join(',');
  return {
    validOrderCount,
    totalOrderCount,
    orderCompletionRate,
    orderCountList,
    dateList,
    validOrderCountList,
  };
};
export const topSev = async (begin: string, end: string) => {
  valid(begin, end);
  const sql = `select od.name, count(*) as count
               from order_detail od
                   join
                   \`orders\` o
               on o.id=od.order_id
               where o.status=? and o.order_time between ? and ?
               group by od.name
               order by count DESC
                   limit 10`;
  const [rows] = await pool.query<TopDate[]>(sql, [5, begin, end]);
  const nameArr: string[] = [];
  const numberArr: number[] = [];
  rows.map(i => {
    nameArr.push(i.name);
    numberArr.push(i.count);
  });
  return {
    nameList: nameArr.join(','),
    numberList: numberArr.join(','),
  };
};
export const turnOverSev = async (begin: string, end: string) => {
  valid(begin, end);
  const dateList = getDateList(begin, end);
  const sql = `select Date (o.order_time) as date, sum (od.number * od.amount) as dayAmount
               from order_detail od
                   join \`orders\` o
               on o.id = od.order_id
               where o.order_time between ? and ? and status=?
               group by date
               order by date ASC`;
  const [rows] = await pool.query<orderCount[]>(sql, [begin, end, 5]);
  const arr = Array.from({ length: dateList.split(',').length }, () => 0);
  for (let j = 0; dateList.length > j; j++) {
    rows.forEach(i => {
      if (dateFormat(i.date).slice(0, 10) == dateList.split(',')[j]) return (arr[j] = i.dayAmount);
    });
  }
  return {
    dateList,
    turnoverList: arr.join(','),
  };
};
export const userStatisticsSev = async (begin: string, end: string) => {
  valid(begin, end);
  const dateList = getDateList(begin, end);
  const dateArr = dateList.split(',');
  const totalSql = `select count(*) as \`count\`
                    from employee
                    where create_time <= ?`;
  const newUserSql = `select count(*) as count,date(create_time) as date
                      from employee
                      where create_time between ? and ?
                      group by date
                      order by date ASC`;
  const [total] = await pool.query<UserCount[]>(totalSql, [begin]);
  const [newUser] = await pool.query<UserCount[]>(newUserSql, [begin, end]);
  let historyCount = total?.[0].count;
  const totalArr = Array.from({ length: dateArr.length }, () => historyCount);
  const newUserArr = Array.from({ length: dateArr.length }, () => 0);
  for (let i = 0; i < dateArr.length; i++) {
    newUser.forEach(j => {
      if (dateFormat(j.date).slice(0, 10) == dateArr[i]) {
        historyCount += j.count;
        return (newUserArr[i] = j.count);
      }
    });
    totalArr[i] = historyCount;
  }
  return {
    dateList,
    newUserList: newUserArr.join(','),
    totalUserList: totalArr.join(','),
  };
};
