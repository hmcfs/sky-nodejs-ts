import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../constants/index';
import redisCli from '../db/redis';
import { CACHE_KEY_TOKEN } from '../constants/index';
import type { DecodedToken, RedisToken } from '../types/jwt.types';
//生成token
export const generateToken = async (userId: number | string) => {
  try {
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    await redisCli.set(
      CACHE_KEY_TOKEN + ':' + userId,
      JSON.stringify({
        userId,
        token,
      })
    );
    await redisCli.expire(CACHE_KEY_TOKEN + ':' + userId, JWT_EXPIRES_IN);
    return token;
  } catch (e) {
    console.log(e);
    return null;
  }
};
//验证token

export const verifyToken = async (token: string) => {
  try {
    const decode = jwt.verify(token, JWT_SECRET) as DecodedToken;
    const redisData = await redisCli.get(CACHE_KEY_TOKEN + ':' + decode.userId);
    const redisToken = redisData ? (JSON.parse(redisData) as RedisToken) : null;
    await redisCli.expire(CACHE_KEY_TOKEN + ':' + decode.userId, JWT_EXPIRES_IN);
    if (decode && redisToken && redisToken.token === token) {
      return decode;
    }
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export function getUserId(token: string) {
  const decode = jwt.verify(token, JWT_SECRET) as DecodedToken;
  return decode.userId || null;
}
