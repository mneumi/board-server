import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserJwtPayload } from 'src/auth/auth.interface';
import { successResponse } from 'src/utils/build_response';
import { updateObject } from 'src/utils/common';
import { getRepository } from 'typeorm';
import { AddLinkDto, SetLinkDto } from './link.dto';
import { LinkEnitty } from './link.entity';

@Injectable()
export class LinkService {
  async addLink(user: UserJwtPayload, addLinkDto: AddLinkDto) {
    const linkRepository = getRepository(LinkEnitty);

    const newLink: Omit<LinkEnitty, 'id'> = {
      url: addLinkDto.url,
      title: addLinkDto.title,
      image: addLinkDto.image,
      userId: user.id,
    };

    await linkRepository.save(newLink);

    return successResponse(newLink);
  }

  async delLink(user: UserJwtPayload, linkId: string) {
    const link = await this.checkOwner(user, linkId);

    const linkRepository = getRepository(LinkEnitty);

    await linkRepository.delete(link);

    return successResponse(link);
  }

  async setLink(user: UserJwtPayload, setLinkDto: SetLinkDto) {
    const { id } = setLinkDto;

    const link = await this.checkOwner(user, String(id));

    const linkRepository = getRepository(LinkEnitty);

    updateObject(link, setLinkDto);

    await linkRepository.save(link);

    return successResponse(link);
  }

  async getLink(user: UserJwtPayload, linkId: string) {
    const link = await this.checkOwner(user, linkId);

    return successResponse(link);
  }

  async listLink(user: UserJwtPayload, page: number, take: number) {
    const linkRepository = getRepository(LinkEnitty);

    const list = await linkRepository.find({
      where: {
        userId: user.id,
      },
      skip: (page - 1) * take,
      take,
    });

    return successResponse(list);
  }

  private async checkOwner(user: UserJwtPayload, linkId: string) {
    const linkRepository = getRepository(LinkEnitty);

    const link = await linkRepository.findOne({ userId: user.id, id: linkId });

    if (!link) {
      throw new UnauthorizedException();
    }

    return link;
  }
}
