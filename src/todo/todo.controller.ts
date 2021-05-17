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
import { AddTodoDto, SetTodoDto } from './todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addTodo(@User() user: UserJwtPayload, @Body() addTodoDto: AddTodoDto) {
    return await this.todoService.addTodo(user, addTodoDto);
  }

  @Delete(':todo_id')
  @UseGuards(AuthGuard('jwt'))
  async delTodo(
    @User() user: UserJwtPayload,
    @Param('todo_id') todoId: string,
  ) {
    return await this.todoService.delTodo(user, +todoId);
  }

  @Put(':todo_id')
  @UseGuards(AuthGuard('jwt'))
  async setTodo(
    @User() user: UserJwtPayload,
    @Param('todo_id') todoId: string,
    @Body() setTodoDto: SetTodoDto,
  ) {
    return await this.todoService.setTodo(user, +todoId, setTodoDto);
  }

  @Get(':todo_id')
  @UseGuards(AuthGuard('jwt'))
  async getTodo(
    @User() user: UserJwtPayload,
    @Param('todo_id') todoId: string,
  ) {
    return await this.todoService.getTodo(user, +todoId);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async listTodo(
    @User() user: UserJwtPayload,
    @Query('page') page: string,
    @Query('take') take: string,
  ) {
    return await this.todoService.listTodo(user, +page, +take);
  }
}
