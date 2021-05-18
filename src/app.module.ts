import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { LinkModule } from './link/link.module';
import { LinkListModule } from './linklist/linklist.module';
import { TodoModule } from './todo/todo.module';
import { TodoListModule } from './todolist/todolist.module';
import { MusicModule } from './music/music.module';
import { MusicListModule } from './musiclist/musiclist.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UsersModule,
    LinkModule,
    LinkListModule,
    TodoModule,
    TodoListModule,
    MusicModule,
    MusicListModule,
  ],
})
export class AppModule {}
