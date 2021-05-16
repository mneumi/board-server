import { IsNotEmpty } from 'class-validator';

export class AddLinkListDto {
  @IsNotEmpty()
  title: string;
}

export class SetLinkListDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  title: string;
}
