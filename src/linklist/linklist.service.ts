import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserJwtPayload } from 'src/auth/auth.interface';
import { successResponse } from 'src/utils/build_response';
import { updateObject } from 'src/utils/common';
import { getRepository } from 'typeorm';
import { AddLinkListDto, SetLinkListDto } from './linkList.dto';
import { LinkListEntity } from './linkList.entity';

@Injectable()
export class LinkListService {
  async addLinkList(user: UserJwtPayload, addLinkListDto: AddLinkListDto) {
    const linkListRepository = getRepository(LinkListEntity);

    const newLinkList: Omit<LinkListEntity, 'id'> = {
      title: addLinkListDto.title,
      userId: user.id,
    };

    await linkListRepository.save(newLinkList);

    return successResponse(newLinkList);
  }

  async delLinkList(user: UserJwtPayload, linkListId: string) {
    const linkList = await this.checkOwner(user, linkListId);

    const linkListRepository = getRepository(LinkListEntity);

    await linkListRepository.delete(linkList);

    return successResponse(linkList);
  }

  async setLinkList(user: UserJwtPayload, setLinkListDto: SetLinkListDto) {
    const { id } = setLinkListDto;

    const linkList = await this.checkOwner(user, String(id));

    const linkListRepository = getRepository(LinkListEntity);

    updateObject(linkList, setLinkListDto);

    await linkListRepository.save(linkList);

    return successResponse(linkList);
  }

  async getLinkList(user: UserJwtPayload, linkListId: string) {
    const linkList = await this.checkOwner(user, linkListId);

    return successResponse(linkList);
  }

  async listLinkList(user: UserJwtPayload, page: number, take: number) {
    const linkListRepository = getRepository(LinkListEntity);

    const list = await linkListRepository.find({
      where: {
        userId: user.id,
      },
      skip: (page - 1) * take,
      take,
    });

    return successResponse(list);
  }

  private async checkOwner(user: UserJwtPayload, linkListId: string) {
    const linkListRepository = getRepository(LinkListEntity);

    const linkList = await linkListRepository.findOne({
      userId: user.id,
      id: linkListId,
    });

    if (!linkList) {
      throw new UnauthorizedException();
    }

    return linkList;
  }
}
