import { Request, Response } from 'express';
import { loginSev } from '../../service/user/login.service';

export const login = async (req: Request, res: Response) => {
  try {
    const code = req.body.code;
    if (!code) throw new Error('code不能为空');
    res.success(await loginSev(code));
  } catch (e) {
    res.fail(e);
  }
};
