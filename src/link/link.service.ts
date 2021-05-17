import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserJwtPayload } from 'src/auth/auth.interface';
import { LinkListEntity } from 'src/linklist/linklist.entity';
import { successResponse } from 'src/utils/build_response';
import { updateObject } from 'src/utils/common';
import { getRepository } from 'typeorm';
import { AddLinkDto, SetLinkDto } from './link.dto';
import { LinkEntity } from './link.entity';

@Injectable()
export class LinkService {
  async addLink(user: UserJwtPayload, addLinkDto: AddLinkDto) {
    const linkRepository = getRepository(LinkEntity);

    const newLink: Omit<LinkEntity, 'id'> = {
      userId: user.id,
      listId: addLinkDto.listId,
      url: addLinkDto.url,
      title: addLinkDto.title,
      image: addLinkDto.image,
    };

    await linkRepository.save(newLink);

    return successResponse(newLink);
  }

  async delLink(user: UserJwtPayload, linkId: number) {
    const link = await this.checkOwner(user, linkId);

    const linkRepository = getRepository(LinkEntity);

    await linkRepository.delete(link);

    return successResponse(link);
  }

  async setLink(user: UserJwtPayload, linkId: number, setLinkDto: SetLinkDto) {
    const { listId } = setLinkDto;

    const link = await this.checkOwner(user, linkId);

    const linkListRepository = getRepository(LinkListEntity);

    const list = await linkListRepository.find({ id: listId, userId: user.id });

    if (list.length <= 0) {
      throw new UnauthorizedException();
    }

    const linkRepository = getRepository(LinkEntity);

    updateObject(link, setLinkDto);

    await linkRepository.save(link);

    return successResponse(link);
  }

  async getLink(user: UserJwtPayload, linkId: number) {
    const link = await this.checkOwner(user, linkId);

    return successResponse(link);
  }

  async listLink(user: UserJwtPayload, page: number, take: number) {
    const linkRepository = getRepository(LinkEntity);

    const list = await linkRepository.find({
      where: {
        userId: user.id,
      },
      skip: (page - 1) * take,
      take,
    });

    const total = await linkRepository.count();

    const result = {
      total,
      list,
    };

    return successResponse(result);

    return successResponse(list);
  }

  private async checkOwner(user: UserJwtPayload, linkId: number) {
    const linkRepository = getRepository(LinkEntity);

    const link = await linkRepository.findOne({
      id: linkId,
      userId: user.id,
    });

    if (!link) {
      throw new UnauthorizedException();
    }

    return link;
  }
}
