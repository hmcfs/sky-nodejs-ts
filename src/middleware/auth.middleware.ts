import { verifyToken } from '../utils/jwt';
import { NextFunction, Request, Response } from 'express';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = String(req.headers.token || '');
  if (!token) return res.fail('请登录');
  if (!(await verifyToken(token)))
    return res.status(401).json({
      code: 0,
      msg: '登录过期',
    });
  next();
}
