import redisClient from '../db/redis';

// 存
/* export const addToRedis = async <T>(key: string, value: T, expire = 3600 * 3) => {
  await redisClient.set(key, JSON.stringify(value));
  await redisClient.expire(key, expire);
};

// 取
export const selectRedis = async <T>(key: string): Promise<T | null> => {
  try {
    const data = await redisClient.get(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  } catch (_) {
    return null;
  }
};

// 删除
export const delRedis = async (key: string) => {
  try {
    await redisClient.del(key);
  } catch (_) {}
};
 */
