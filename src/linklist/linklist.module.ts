import { Module } from '@nestjs/common';
import { LinklistController } from './linklist.controller';
import { LinklistService } from './linklist.service';

@Module({
  controllers: [LinklistController],
  providers: [LinklistService],
})
export class LinklistModule {}
