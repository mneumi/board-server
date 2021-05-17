import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserJwtPayload } from 'src/auth/auth.interface';
import { successResponse } from 'src/utils/build_response';
import { updateObject } from 'src/utils/common';
import { getRepository } from 'typeorm';
import { AddMusicListDto, SetMusicListDto } from './musiclist.dto';
import { MusicListEntity } from './musiclist.entity';

@Injectable()
export class MusicListService {
  async addMusicList(user: UserJwtPayload, addMusicListDto: AddMusicListDto) {
    const musicListRepository = getRepository(MusicListEntity);

    const newMusicList: Omit<MusicListEntity, 'id'> = {
      title: addMusicListDto.title,
      userId: user.id,
    };

    await musicListRepository.save(newMusicList);

    return successResponse(newMusicList);
  }

  async delMusicList(user: UserJwtPayload, musicListId: number) {
    const musicList = await this.checkOwner(user, musicListId);

    const musicListRepository = getRepository(MusicListEntity);

    await musicListRepository.delete(musicList);

    return successResponse(musicList);
  }

  async setMusicList(
    user: UserJwtPayload,
    musicListId: number,
    setMusicListDto: SetMusicListDto,
  ) {
    const musicList = await this.checkOwner(user, musicListId);

    const musicListRepository = getRepository(MusicListEntity);

    updateObject(musicList, setMusicListDto);

    await musicListRepository.save(musicList);

    return successResponse(musicList);
  }

  async getMusicList(user: UserJwtPayload, musicListId: number) {
    const musicList = await this.checkOwner(user, musicListId);

    return successResponse(musicList);
  }

  async listMusicList(user: UserJwtPayload, page: number, take: number) {
    const musicListRepository = getRepository(MusicListEntity);

    const list = await musicListRepository.find({
      where: {
        userId: user.id,
      },
      skip: (page - 1) * take,
      take,
    });

    const total = await musicListRepository.count();

    const result = {
      total,
      list,
    };

    return successResponse(result);
  }

  private async checkOwner(user: UserJwtPayload, musicListId: number) {
    const musicListRepository = getRepository(MusicListEntity);

    const musicList = await musicListRepository.findOne({
      id: musicListId,
      userId: user.id,
    });

    if (!musicList) {
      throw new UnauthorizedException();
    }

    return musicList;
  }
}
