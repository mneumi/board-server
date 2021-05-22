import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserJwtPayload } from 'src/auth/auth.interface';
import { MusicListEntity } from 'src/musiclist/musiclist.entity';
import { successResponse } from 'src/utils/build_response';
import { updateObject } from 'src/utils/common';
import { getRepository } from 'typeorm';
import { AddMusicDto, SetMusicDto } from './music.dto';
import { MusicEntity } from './music.entity';

@Injectable()
export class MusicService {
  async addMusic(user: UserJwtPayload, addMusicDto: AddMusicDto) {
    const musicRepository = getRepository(MusicEntity);

    const newMusic: Omit<MusicEntity, 'id'> = {
      userId: user.id,
      listId: addMusicDto.listId,
      singer: addMusicDto.singer,
      song: addMusicDto.song,
      songUrl: addMusicDto.songUrl,
      language: addMusicDto.language,
      coverImg: addMusicDto.coverImg,
    };

    await musicRepository.save(newMusic);

    return successResponse(newMusic);
  }

  async delMusic(user: UserJwtPayload, musicId: number) {
    const music = await this.checkOwner(user, musicId);

    const musicRepository = getRepository(MusicEntity);

    await musicRepository.delete(music);

    return successResponse(music);
  }

  async setMusic(
    user: UserJwtPayload,
    musicId: number,
    setMusicDto: SetMusicDto,
  ) {
    const { listId } = setMusicDto;

    const music = await this.checkOwner(user, musicId);

    const musicListRepository = getRepository(MusicListEntity);

    const list = await musicListRepository.find({
      id: listId,
      userId: user.id,
    });

    if (list.length <= 0) {
      throw new UnauthorizedException();
    }

    const musicRepository = getRepository(MusicEntity);

    updateObject(music, setMusicDto);

    await musicRepository.save(music);

    return successResponse(music);
  }

  async getMusic(user: UserJwtPayload, musicId: number) {
    const music = await this.checkOwner(user, musicId);

    return successResponse(music);
  }

  async listMusic(user: UserJwtPayload, page: number, take: number) {
    const musicRepository = getRepository(MusicEntity);

    const list = await musicRepository.find({
      where: {
        userId: user.id,
      },
      skip: (page - 1) * take,
      take,
    });

    const total = await musicRepository.count();

    const result = {
      total,
      list,
    };

    return successResponse(result);

    return successResponse(list);
  }

  private async checkOwner(user: UserJwtPayload, musicId: number) {
    const musicRepository = getRepository(MusicEntity);

    const music = await musicRepository.findOne({
      id: musicId,
      userId: user.id,
    });

    if (!music) {
      throw new UnauthorizedException();
    }

    return music;
  }
}
