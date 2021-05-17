import { IsNotEmpty } from 'class-validator';

export class AddTodoListDto {
  @IsNotEmpty()
  title: string;
}

export class SetTodoListDto {
  @IsNotEmpty()
  title: string;
}
