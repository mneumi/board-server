import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserJwtPayload } from 'src/auth/auth.interface';
import { User } from './user.decorator';

@Controller('user')
export class UserController {
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@User() user: UserJwtPayload) {
    return user;
  }
}
