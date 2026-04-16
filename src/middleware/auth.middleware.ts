import { verifyToken } from '../utils/jwt';
import { Request, Response, NextFunction } from 'express';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = String(req.headers.token || '');
  if (!token) return res.fail('请登录');
  if (!(await verifyToken(token))) return res.fail('登录过期');
  next();
}
