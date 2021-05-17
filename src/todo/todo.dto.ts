import { IsNotEmpty } from 'class-validator';

export class AddTodoDto {
  @IsNotEmpty()
  listId: number;

  @IsNotEmpty()
  content: string;
}

export class SetTodoDto {
  @IsNotEmpty()
  listId: number;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  done: boolean;
}
