import pool from '../db/mysql';
import { RowDataPacket } from 'mysql2';
import { generateToken } from '../utils/jwt';
import redisCli from '../db/redis';
import { CACHE_KEY_TOKEN } from '../constants/index';
import { verifyPassword } from '../utils/bcript';
import { verify } from 'node:crypto';
type LoginFormData = {
  username: string;
  password: string;
};
interface LoginRes extends RowDataPacket {
  id: number;
  username: string;
  name: string;
}
export const loginSev = async (data: LoginFormData) => {
  const sql = 'select * from employee where username=?';

  const [result] = await pool.query<LoginRes[]>(sql, [data.username]);
  const isMatch = await verifyPassword(data.password, result[0].password);
  if (result.length > 0 && isMatch) {
    const token = await generateToken(result[0].id);
    return {
      id: result[0].id,
      username: result[0].username,
      name: result[0].name,
      token,
    };
  }
  return null;
};
export const logoutSev = async (userId: string) => {
  await redisCli.del(CACHE_KEY_TOKEN + ':' + userId);
};
