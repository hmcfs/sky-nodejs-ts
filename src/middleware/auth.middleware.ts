import { verifyToken } from '../utils/jwt';
import { NextFunction, Request, Response } from 'express';
import { checkAdmin, checkUser } from '../utils/permission';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = String(req.headers.token || '');
  if (!token) return res.fail('请登录');
  const decoded = await verifyToken(token);
  if (!decoded)
    return res.status(401).json({
      code: 0,
      msg: '登录过期',
    });
  if (!checkAdmin(Number(decoded.userId), req.method, req.path))
    return res.status(403).json({
      code: 0,
      msg: '无权限',
    });
  next();
}

export async function userAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log('userAuthMiddleware');
  const token = String(req.headers.authentication || '');
  if (!token) return res.fail('请登录');
  if (!(await verifyToken(token)))
    return res.status(401).json({
      code: 0,
      msg: '登录过期',
    });
  if (!checkUser(req.url))
    return res.status(403).json({
      code: 0,
      msg: '无权限',
    });
  next();
}
