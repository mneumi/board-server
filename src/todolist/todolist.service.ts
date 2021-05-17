import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserJwtPayload } from 'src/auth/auth.interface';
import { successResponse } from 'src/utils/build_response';
import { updateObject } from 'src/utils/common';
import { getRepository } from 'typeorm';
import { AddTodoListDto, SetTodoListDto } from './todolist.dto';
import { TodoListEntity } from './todolist.entity';

@Injectable()
export class TodoListService {
  async addTodoList(user: UserJwtPayload, addTodoListDto: AddTodoListDto) {
    const todoListRepository = getRepository(TodoListEntity);

    const newTodoList: Omit<TodoListEntity, 'id'> = {
      title: addTodoListDto.title,
      userId: user.id,
    };

    await todoListRepository.save(newTodoList);

    return successResponse(newTodoList);
  }

  async delTodoList(user: UserJwtPayload, todoListId: number) {
    const todoList = await this.checkOwner(user, todoListId);

    const todoListRepository = getRepository(TodoListEntity);

    await todoListRepository.delete(todoList);

    return successResponse(todoList);
  }

  async setTodoList(
    user: UserJwtPayload,
    todoListId: number,
    setTodoListDto: SetTodoListDto,
  ) {
    const todoList = await this.checkOwner(user, todoListId);

    const todoListRepository = getRepository(TodoListEntity);

    updateObject(todoList, setTodoListDto);

    await todoListRepository.save(todoList);

    return successResponse(todoList);
  }

  async getTodoList(user: UserJwtPayload, todoListId: number) {
    const todoList = await this.checkOwner(user, todoListId);

    return successResponse(todoList);
  }

  async listTodoList(user: UserJwtPayload, page: number, take: number) {
    const todoListRepository = getRepository(TodoListEntity);

    const list = await todoListRepository.find({
      where: {
        userId: user.id,
      },
      skip: (page - 1) * take,
      take,
    });

    const total = await todoListRepository.count();

    const result = {
      total,
      list,
    };

    return successResponse(result);
  }

  private async checkOwner(user: UserJwtPayload, todoListId: number) {
    const todoListRepository = getRepository(TodoListEntity);

    const todoList = await todoListRepository.findOne({
      id: todoListId,
      userId: user.id,
    });

    if (!todoList) {
      throw new UnauthorizedException();
    }

    return todoList;
  }
}
