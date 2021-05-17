import { IsNotEmpty } from 'class-validator';

export class AddLinkDto {
  @IsNotEmpty()
  listId: number;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  title: string;

  image: string;
}

export class SetLinkDto {
  @IsNotEmpty()
  listId: number;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  image: string;
}
