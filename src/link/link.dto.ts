import { IsNotEmpty } from 'class-validator';

export class AddLinkDto {
  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  title: string;

  image: string;
}

export class SetLinkDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  image: string;
}
