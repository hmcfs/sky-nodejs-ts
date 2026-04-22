import OSS from 'ali-oss';
import config from '../config/index';
import path from 'path';

const ossClient = new OSS(config.ossConfig);
export const uploadToOss = async (fileBuffer: Buffer, originalname: string) => {
  const ext = path.extname(originalname);
  const fileName = `meal-images/${Date.now()}${ext}`;
  const result = await ossClient.put(fileName, fileBuffer);
  return result.url;
};
