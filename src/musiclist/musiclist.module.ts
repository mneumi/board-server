import { Module } from '@nestjs/common';
import { MusicListController } from './musiclist.controller';
import { MusicListService } from './musiclist.service';

@Module({
  controllers: [MusicListController],
  providers: [MusicListService],
})
export class MusicListModule {}
