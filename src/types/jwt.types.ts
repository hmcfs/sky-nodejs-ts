import { JwtPayload } from 'jsonwebtoken';
export interface DecodedToken extends JwtPayload {
  userId: number | string;
}
export interface RedisToken {
  userId: string;
  token: string;
}
