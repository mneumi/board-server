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
import { AddLinkDto, SetLinkDto } from './link.dto';
import { LinkService } from './link.service';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addLink(@User() user: UserJwtPayload, @Body() addLinkDto: AddLinkDto) {
    return await this.linkService.addLink(user, addLinkDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delLink(@User() user: UserJwtPayload, @Param('id') linkId: string) {
    return await this.linkService.delLink(user, linkId);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async setLink(@User() user: UserJwtPayload, @Body() setLinkDto: SetLinkDto) {
    return await this.linkService.setLink(user, setLinkDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getLink(@User() user: UserJwtPayload, @Param('id') linkId: string) {
    return await this.linkService.getLink(user, linkId);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async listLink(
    @User() user: UserJwtPayload,
    @Query('page') page: string,
    @Query('take') take: string,
  ) {
    return await this.linkService.listLink(user, +page, +take);
  }
}
