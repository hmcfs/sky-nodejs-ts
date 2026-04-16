import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../constants';
export async function hashPassword(password: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
  } catch (e) {
    console.log(e);
  }
}
export async function verifyPassword(password: string, hashedPassword: string) {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (e) {
    console.log(e);
    return false;
  }
}
