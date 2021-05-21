import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OSSClient } from './oss';
import { nanoid } from 'src/utils/nanoid';
import { successResponse } from 'src/utils/build_response';
import { AuthGuard } from '@nestjs/passport';

@Controller('upload')
export class UploadController {
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    const ext = (file.originalname as string).split('.')[1];
    const filename = `${new Date().getTime()}-${nanoid()}.${ext}`;

    const { name, url } = await OSSClient.put(filename, file.buffer);

    return successResponse({ name, url });
  }
}
