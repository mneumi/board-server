import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './auth.dto';
import { getRepository } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';
import { UserJwtPayload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const userRepository = getRepository(UserEntity);

    const { username, password } = registerDto;

    const user = await userRepository.findOne({ username });

    if (user) {
      throw new ConflictException('用户名重复');
    }

    const salt = makeSalt();
    const hashPassword = encryptPassword(password, salt);

    const newUser: Omit<UserEntity, 'id'> = {
      username,
      password: hashPassword,
      salt,
      nickname: username,
      avatar:
        'http://columns-oss.oss-cn-shenzhen.aliyuncs.com/1619371424893-4156lluh.jpeg',
      desc: '还没有留下简介',
    };

    await userRepository.save(newUser);

    return {
      error: 0,
      message: 'ok',
    };
  }

  async login(user: UserJwtPayload) {
    const payload: UserJwtPayload = {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      avatar: user.avatar,
      desc: user.desc,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserEntity | null> {
    const userRepository = getRepository(UserEntity);

    const user = await userRepository.findOne({ username });

    if (!user || user.password !== encryptPassword(password, user.salt)) {
      return null;
    }

    return user;
  }
}
