import { Request, Response, Router } from 'express';
import multer from 'multer';
import { uploadToOss } from '../../utils/oss';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
});
router.post('/admin/common/upload', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) return res.fail('请上传文件');
    const imgUrl = await uploadToOss(file.buffer, file.originalname);
    return res.success(imgUrl, '上传成功');
  } catch (e) {
    res.fail(e);
  }
});
export default router;
