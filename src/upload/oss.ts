import OSS from 'ali-oss';
import { accessKeyId, accessKeySecret } from './secret';

export const OSSClient = new OSS({
  region: 'oss-cn-shenzhen',
  bucket: 'columns-oss',
  accessKeyId,
  accessKeySecret,
});
