import { Response } from 'express';

interface ErrResult {
  code: number;
  msg: any;
}
interface SucResult<T> {
  code: number;
  msg: string;
  data: T | null;
}
const handleErr = (res: Response, e: any) => {
  const errorMsg = e instanceof Error ? e.message : '服务器错误';
  res.json({
    code: 500,
    msg: errorMsg,
  } as ErrResult);
  console.error(errorMsg);
};
const handleSuc = <T>(res: Response, data: T) => {
  if (Array.isArray(data) && data.length === 0) {
    res.json({
      code: 404,
      msg: '不存在',
      data: null,
    } as SucResult<T>);
    return;
  }

  res.json({
    code: 200,
    msg: 'success',
    data,
  } as SucResult<T>);
};

export { handleErr, handleSuc };
