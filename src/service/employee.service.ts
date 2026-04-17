import { create } from 'node:domain';
import pool from '../db/mysql';
import type { EmployeeCreate, Employee } from '../types/employee.type';
import { hashPassword } from '../utils/bcript';
import dateFormat from '../utils/dateFormat';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
function omitPlaceholder(arr: Employee[]) {
  return arr.map(i => {
    i.update_time = dateFormat(i.update_time);
    i.create_time = dateFormat(i.create_time);
    const { password, create_time, id_number, update_time, ...rest } = i;
    return { ...rest, creeTime: create_time, updateTime: update_time, idNumber: id_number };
  });
}
// 获取所有员工+条件查询
export const getEmployeeListSev = async (page: number, pageSize: number, name?: string) => {
  const arr1: (number | string)[] = [(page - 1) * pageSize, pageSize];
  const arr2: (number | string)[] = [];
  let sqlQuery: string = 'select * from employee limit ?,?';
  let sqlTotal: string = 'select count(*) as total from employee';
  if (name) {
    sqlQuery = 'select * from employee where name like ? limit ?,?';
    sqlTotal = 'select count(*) as total from employee where name like ?';
    arr1.unshift(`%${name}%`);
    arr2.unshift(`%${name}%`);
  }
  const [rows] = await pool.query<Employee[]>(sqlQuery, arr1);
  const [total] = await pool.query<Employee[]>(sqlTotal, arr2);
  return { total: total[0].total, records: omitPlaceholder(rows) };
};
//id查询
export const getByIdSev = async (id: string) => {
  const [rows] = await pool.query<Employee[]>(`select * from employee where id=${id}`);
  return omitPlaceholder(rows)[0];
};

// 新增员工
export const addSev = async (data: EmployeeCreate) => {
  const password = await hashPassword('123456');
  const date = new Date();
  const sql =
    'insert into employee (name,phone,sex,id_number,username,password,create_time,update_time) values (?,?,?,?,?,?,?,?)';
  const { name, phone, sex, idNumber, username } = data;
  const [rows] = await pool.query(sql, [
    name,
    phone,
    sex,
    idNumber,
    username,
    password,
    date,
    date,
  ]);
  return rows;
};
// 更新员工
export const updateSev = async (data: EmployeeCreate) => {
  const { name, phone, sex, idNumber, username, id } = data;
  const sql =
    'update employee set name=?,phone=?,sex=?,id_number=?,username=?,update_time=? where id=?';
  const [result] = await pool.query<ResultSetHeader>(sql, [
    name,
    phone,
    sex,
    idNumber,
    username,
    new Date(),
    id,
  ]);
  return result;
};
//禁用员工
export const disableSev = async (status: number, id: number) => {
  const [result] = await pool.query<ResultSetHeader>('update employee set status=? where id=?', [
    status,
    id,
  ]);
  return result;
};
