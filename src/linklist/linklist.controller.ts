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
import { AddLinkListDto, SetLinkListDto } from './linklist.dto';
import { LinkListService } from './linklist.service';

@Controller('linklist')
export class LinkListController {
  constructor(private readonly linkListService: LinkListService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addLinkList(
    @User() user: UserJwtPayload,
    @Body() addLinkListDto: AddLinkListDto,
  ) {
    return await this.linkListService.addLinkList(user, addLinkListDto);
  }

  @Delete(':linklist_id')
  @UseGuards(AuthGuard('jwt'))
  async delLinkList(
    @User() user: UserJwtPayload,
    @Param('linklist_id') linkListId: string,
  ) {
    return await this.linkListService.delLinkList(user, +linkListId);
  }

  @Put(':linklist_id')
  @UseGuards(AuthGuard('jwt'))
  async setLinkList(
    @User() user: UserJwtPayload,
    @Param('linklist_id') linkListId: string,
    @Body() setLinkListDto: SetLinkListDto,
  ) {
    return await this.linkListService.setLinkList(
      user,
      +linkListId,
      setLinkListDto,
    );
  }

  @Get(':linklist_id')
  @UseGuards(AuthGuard('jwt'))
  async getLinkList(
    @User() user: UserJwtPayload,
    @Param('linklist_id') linkListId: string,
  ) {
    return await this.linkListService.getLinkList(user, +linkListId);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async listLinkList(
    @User() user: UserJwtPayload,
    @Query('page') page: string,
    @Query('take') take: string,
  ) {
    return await this.linkListService.listLinkList(user, +page, +take);
  }
}
