import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';
import { CACHE_KEY_LOG } from '../constants';
import redisClient from '../db/redis';

declare global {
  namespace Express {
    interface Response {
      success(data?: any, msg?: string): void;

      fail(err: any, code?: number): void;
    }
  }
}

export async function responseMiddleware(req: Request, res: Response, next: NextFunction) {
  // 跨域配置
  console.log(req.headers.origin);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,token,authentication');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.success = (data: any = null, msg = 'success', code = 1) => {
    res.json({
      code,
      msg,
      data,
    });
  };
  res.fail = async (err: any, code = 0) => {
    let msg = '服务器错误';

    // 1.  Sequelize 字段校验错误（格式不对、非空）
    if (err.name === 'SequelizeValidationError') {
      msg = err.errors?.[0]?.message || '字段校验失败';
      code = 0;
    }
    // 2.  Sequelize 唯一重复错误
    else if (err.name === 'SequelizeUniqueConstraintError') {
      msg = '数据重复：' + (err.errors?.[0]?.message || '已存在相同数据');
      code = 0;
    }
    // 3.  JS 标准错误
    else if (err instanceof Error) {
      msg = err.message;
    }
    // 4. 字符串
    else if (typeof err === 'string') {
      msg = err;
    }

    logger.error(` ${req.method} ${req.originalUrl} error:${msg}`, { err });
    try {
      const errorLog = {
        time: new Date().toLocaleString(),
        url: req.originalUrl,
        ip: req.ip || 'unknown',
        msg,
        err: err.message || 'unknown error',
      };
      await redisClient.lPush(CACHE_KEY_LOG + ':errors', JSON.stringify(errorLog));
      await redisClient.lTrim(CACHE_KEY_LOG + ':errors', 0, 999);
      await redisClient.expire(CACHE_KEY_LOG + ':errors', 60 * 60 * 24 * 7);
    } catch (e) {}
    res.json({ code, msg, data: null });
  };
  next();
}
