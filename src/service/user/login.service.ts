import axios from 'axios';
import { WX_API_URL, WX_GRANT_TYPE } from '../../constants/index';
import pool from '../../db/mysql';
import { generateToken } from '../../utils/jwt';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

interface LoginRes extends RowDataPacket {
  id: number;
  openid: string;
  name?: string;
  phone?: string;
  sex?: number;
  create_time: Date;
  avatar?: string;
  id_number?: string;
}

export const loginSev = async (code: string) => {
  const { data } = await axios.get(WX_API_URL, {
    params: {
      appid: process.env.WECHAT_APPID,
      secret: process.env.WECHAT_SECRET,
      js_code: code,
      grant_type: WX_GRANT_TYPE,
    },
    timeout: 5000,
  });
  if (data.errcode) {
    throw new Error(`微信授权失败：${data.errmsg}`);
  }
  const sql1 = `select *
                from \`user\`
                where openid = ?`;
  const sql2 = `insert into user (openid, create_time)
                values (?, ?)`;
  const cnnt = await pool.getConnection();

  try {
    let rows2;
    let rows3;
    await cnnt.beginTransaction();
    const [rows1] = await pool.query<LoginRes[]>(sql1, [data.openid]);
    if (rows1.length === 0) {
      [rows2] = await pool.query<ResultSetHeader>(sql2, [data.openid, new Date()]);

      if (rows2.affectedRows) [rows3] = await pool.query<LoginRes[]>(sql1, [data.openid]);
    }

    await cnnt.commit();
    const token = await generateToken(data.openid);
    return {
      token,
      openid: data.openid,
      id: rows1.length > 0 ? rows1[0].id : rows3![0].id,
    };
  } catch (err) {
    cnnt.rollback();
    throw err;
  } finally {
    cnnt.release();
  }
};
