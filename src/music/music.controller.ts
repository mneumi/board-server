import {
  Body,
  Controller,
  Post,
  UseGuards,
  Delete,
  Param,
  Put,
  Get,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserJwtPayload } from 'src/auth/auth.interface';
import { User } from 'src/user/user.decorator';
import { AddMusicDto, SetMusicDto } from './music.dto';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addMusic(
    @User() user: UserJwtPayload,
    @Body() addMusicDto: AddMusicDto,
  ) {
    return await this.musicService.addMusic(user, addMusicDto);
  }

  @Delete(':music_id')
  @UseGuards(AuthGuard('jwt'))
  async delMusic(
    @User() user: UserJwtPayload,
    @Param('music_id') musicId: string,
  ) {
    return await this.musicService.delMusic(user, +musicId);
  }

  @Put(':music_id')
  @UseGuards(AuthGuard('jwt'))
  async setMusic(
    @User() user: UserJwtPayload,
    @Param('music_id') musicId: string,
    @Body() setMusicDto: SetMusicDto,
  ) {
    return await this.musicService.setMusic(user, +musicId, setMusicDto);
  }

  @Get(':music_id')
  @UseGuards(AuthGuard('jwt'))
  async getMusic(
    @User() user: UserJwtPayload,
    @Param('music_id') musicId: string,
  ) {
    return await this.musicService.getMusic(user, +musicId);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async listMusic(
    @User() user: UserJwtPayload,
    @Query('page') page: string,
    @Query('take') take: string,
  ) {
    return await this.musicService.listMusic(user, +page, +take);
  }
}
