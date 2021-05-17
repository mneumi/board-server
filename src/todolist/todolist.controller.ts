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
import { AddTodoListDto, SetTodoListDto } from './todolist.dto';
import { TodoListService } from './todolist.service';

@Controller('todolist')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addTodoList(
    @User() user: UserJwtPayload,
    @Body() addTodoListDto: AddTodoListDto,
  ) {
    return await this.todoListService.addTodoList(user, addTodoListDto);
  }

  @Delete(':todolist_id')
  @UseGuards(AuthGuard('jwt'))
  async delTodoList(
    @User() user: UserJwtPayload,
    @Param('todolist_id') todoListId: string,
  ) {
    return await this.todoListService.delTodoList(user, +todoListId);
  }

  @Put(':todolist_id')
  @UseGuards(AuthGuard('jwt'))
  async setTodoList(
    @User() user: UserJwtPayload,
    @Param('todolist_id') todoListId: string,
    @Body() setTodoListDto: SetTodoListDto,
  ) {
    return await this.todoListService.setTodoList(
      user,
      +todoListId,
      setTodoListDto,
    );
  }

  @Get(':todolist_id')
  @UseGuards(AuthGuard('jwt'))
  async getTodoList(
    @User() user: UserJwtPayload,
    @Param('todolist_id') todoListId: string,
  ) {
    return await this.todoListService.getTodoList(user, +todoListId);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async listTodoList(
    @User() user: UserJwtPayload,
    @Query('page') page: string,
    @Query('take') take: string,
  ) {
    return await this.todoListService.listTodoList(user, +page, +take);
  }
}
