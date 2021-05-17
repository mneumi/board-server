import { IsNotEmpty } from 'class-validator';

export class AddMusicDto {
  @IsNotEmpty()
  listId: number;

  @IsNotEmpty()
  content: string;
}

export class SetMusicDto {
  @IsNotEmpty()
  listId: number;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  done: boolean;
}
