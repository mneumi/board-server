import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserJwtPayload } from 'src/auth/auth.interface';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserJwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserJwtPayload;
  },
);
