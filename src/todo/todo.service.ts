import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserJwtPayload } from 'src/auth/auth.interface';
import { TodoListEntity } from 'src/todolist/todolist.entity';
import { successResponse } from 'src/utils/build_response';
import { updateObject } from 'src/utils/common';
import { getRepository } from 'typeorm';
import { AddTodoDto, SetTodoDto } from './todo.dto';
import { TodoEntity } from './todo.entity';

@Injectable()
export class TodoService {
  async addTodo(user: UserJwtPayload, addTodoDto: AddTodoDto) {
    const todoRepository = getRepository(TodoEntity);

    const newTodo: Omit<TodoEntity, 'id'> = {
      userId: user.id,
      listId: addTodoDto.listId,
      content: addTodoDto.content,
      done: false,
    };

    await todoRepository.save(newTodo);

    return successResponse(newTodo);
  }

  async delTodo(user: UserJwtPayload, todoId: number) {
    const todo = await this.checkOwner(user, todoId);

    const todoRepository = getRepository(TodoEntity);

    await todoRepository.delete(todo);

    return successResponse(todo);
  }

  async setTodo(user: UserJwtPayload, todoId: number, setTodoDto: SetTodoDto) {
    const { listId } = setTodoDto;

    const todo = await this.checkOwner(user, todoId);

    const todoListRepository = getRepository(TodoListEntity);

    const list = await todoListRepository.find({ id: listId, userId: user.id });

    if (list.length <= 0) {
      throw new UnauthorizedException();
    }

    const todoRepository = getRepository(TodoEntity);

    updateObject(todo, setTodoDto);

    await todoRepository.save(todo);

    return successResponse(todo);
  }

  async getTodo(user: UserJwtPayload, todoId: number) {
    const todo = await this.checkOwner(user, todoId);

    return successResponse(todo);
  }

  async listTodo(user: UserJwtPayload, page: number, take: number) {
    const todoRepository = getRepository(TodoEntity);

    const list = await todoRepository.find({
      where: {
        userId: user.id,
      },
      skip: (page - 1) * take,
      take,
    });

    const total = await todoRepository.count();

    const result = {
      total,
      list,
    };

    return successResponse(result);

    return successResponse(list);
  }

  private async checkOwner(user: UserJwtPayload, todoId: number) {
    const todoRepository = getRepository(TodoEntity);

    const todo = await todoRepository.findOne({
      id: todoId,
      userId: user.id,
    });

    if (!todo) {
      throw new UnauthorizedException();
    }

    return todo;
  }
}
