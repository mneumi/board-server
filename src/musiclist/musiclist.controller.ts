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
import { AddMusicListDto, SetMusicListDto } from './musiclist.dto';
import { MusicListService } from './musiclist.service';

@Controller('musiclist')
export class MusicListController {
  constructor(private readonly musicListService: MusicListService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addMusicList(
    @User() user: UserJwtPayload,
    @Body() addMusicListDto: AddMusicListDto,
  ) {
    return await this.musicListService.addMusicList(user, addMusicListDto);
  }

  @Delete(':musiclist_id')
  @UseGuards(AuthGuard('jwt'))
  async delMusicList(
    @User() user: UserJwtPayload,
    @Param('musiclist_id') musicListId: string,
  ) {
    return await this.musicListService.delMusicList(user, +musicListId);
  }

  @Put(':musiclist_id')
  @UseGuards(AuthGuard('jwt'))
  async setMusicList(
    @User() user: UserJwtPayload,
    @Param('musiclist_id') musicListId: string,
    @Body() setMusicListDto: SetMusicListDto,
  ) {
    return await this.musicListService.setMusicList(
      user,
      +musicListId,
      setMusicListDto,
    );
  }

  @Get(':musiclist_id')
  @UseGuards(AuthGuard('jwt'))
  async getMusicList(
    @User() user: UserJwtPayload,
    @Param('musiclist_id') musicListId: string,
  ) {
    return await this.musicListService.getMusicList(user, +musicListId);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async listMusicList(
    @User() user: UserJwtPayload,
    @Query('page') page: string,
    @Query('take') take: string,
  ) {
    return await this.musicListService.listMusicList(user, +page, +take);
  }
}
