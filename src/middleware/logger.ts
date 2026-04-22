import { Request, Response, NextFunction } from 'express';
import redisClient from '../db/redis'; // 你的 redis 实例

import { CACHE_KEY_LOG } from '../constants/index';
export const loggerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.path.startsWith('/admin') || req.path.startsWith('/user)')) {
      const log = {
        time: new Date().toLocaleString(),
        method: req.method,
        url: req.originalUrl,
        ip: req.ip || 'unknown',
        ua: req.get('user-agent') || '',
      };

      // ==================== 1. 存 Redis 列表 ====================
      await redisClient.lPush(CACHE_KEY_LOG + ':requests', JSON.stringify(log));
      await redisClient.expire(CACHE_KEY_LOG + ':requests', 60 * 60 * 24 * 7);

      // ==================== 2. 接口访问计数（统计） ====================
      await redisClient.hIncrBy(CACHE_KEY_LOG + ':count', req.originalUrl, 1);

      // 只保留最近 1000 条日志，防止爆内存
      await redisClient.lTrim(CACHE_KEY_LOG + ':requests', 0, 999);
      // 3. String：总访问量统计
      await redisClient.INCR('demo2:logs:total:count');

      // 4. Set：独立IP统计
      await redisClient.SADD('demo2:logs:ips', req.ip || '');

      // 5. ZSet：接口访问排行榜
      await redisClient.ZINCRBY('demo2:logs:api:rank', 1, req.path);
      console.log(`[日志已存入Redis] ${req.method} ${req.originalUrl}`);
    }
  } catch (err) {
    console.log('日志写入Redis失败', err);
  }

  next();
};
