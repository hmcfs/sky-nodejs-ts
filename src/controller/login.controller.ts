import { loginSev, logoutSev } from '../service/login.service';
import { Request, Response } from 'express';
import type { RedisToken } from '../types/jwt.types';
import { verifyToken } from '../utils/jwt';
export const login = async (req: Request, res: Response) => {
  try {
    const data = await loginSev(req.body);
    if (data) {
      res.json({
        code: 1,
        msg: 'success',
        data,
      });
    } else {
      res.fail('用户名或密码错误');
    }
  } catch (e) {
    res.fail(e);
  }
};

// 退出登录
export const logout = async (req: Request, res: Response) => {
  try {
    const token = (await verifyToken(String(req.headers.token))) as RedisToken | null;

    if (!token) {
      return res.fail('用户未登录');
    }

    await logoutSev(token.userId);
    res.json({
      code: 1,
      msg: 'success',
    });
  } catch (e) {
    res.fail(e);
  }
};
