import { Module } from '@nestjs/common';
import { TodoListController } from './todolist.controller';
import { TodoListService } from './todolist.service';

@Module({
  controllers: [TodoListController],
  providers: [TodoListService],
})
export class TodoListModule {}
