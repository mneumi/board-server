import * as crypto from 'crypto';

export function makeSalt(): string {
  return crypto.randomBytes(3).toString('base64');
}

export function encryptPassword(password: string, salt: string): string {
  const saltBuffer = Buffer.from(salt, 'base64');

  return (
    // 10000 代表迭代次数
    // 16 代表长度
    crypto
      .pbkdf2Sync(password, saltBuffer, 10000, 16, 'sha1')
      .toString('base64')
  );
}
