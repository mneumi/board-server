import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkModule } from './link/link.module';
import { LinklistModule } from './linklist/linklist.module';
@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UsersModule, LinkModule, LinklistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
