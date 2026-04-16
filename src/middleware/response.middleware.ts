import { Response, Request, NextFunction } from 'express';
declare global {
  namespace Express {
    interface Response {
      success(data: any, msg?: string): void;
      fail(msg: any, code?: number): void;
    }
  }
}
export function responseMiddleware(req: Request, res: Response, next: NextFunction) {
  res.success = (data: any, msg = 'success', code = 1) => {
    res.json({
      code,
      msg,
      data,
    });
  };
  res.fail = (msg: any, code = 0) => {
    if (typeof msg !== 'string') msg = msg instanceof Error ? msg.message : '服务器错误';
    res.json({
      code,
      msg,
      data: null,
    });
  };
  next();
}
