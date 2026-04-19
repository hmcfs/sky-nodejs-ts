import { Response, Request, NextFunction } from 'express';
declare global {
  namespace Express {
    interface Response {
      success(data?: any, msg?: string): void;
      fail(err: any, code?: number): void;
    }
  }
}
export function responseMiddleware(req: Request, res: Response, next: NextFunction) {
  res.success = (data: any = null, msg = 'success', code = 1) => {
    res.json({
      code,
      msg,
      data,
    });
  };
  res.fail = (err: any, code = 0) => {
    let msg = '服务器错误';

    // 1.  Sequelize 字段校验错误（格式不对、非空）
    if (err.name === 'SequelizeValidationError') {
      msg = err.errors?.[0]?.message || '字段校验失败';
      code = 400;
    }
    // 2.  Sequelize 唯一重复错误
    else if (err.name === 'SequelizeUniqueConstraintError') {
      msg = '数据重复：' + (err.errors?.[0]?.message || '已存在相同数据');
      code = 400;
    }
    // 3.  JS 标准错误
    else if (err instanceof Error) {
      msg = err.message;
    }
    // 4. 字符串
    else if (typeof err === 'string') {
      msg = err;
    }

    console.error('响应失败：', msg);
    res.json({ code, msg, data: null });
  };
  next();
}
