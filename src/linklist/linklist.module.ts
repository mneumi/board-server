import { Module } from '@nestjs/common';
import { LinkListController } from './linklist.controller';
import { LinkListService } from './linklist.service';

@Module({
  controllers: [LinkListController],
  providers: [LinkListService],
})
export class LinkListModule {}
