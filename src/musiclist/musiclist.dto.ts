import { IsNotEmpty } from 'class-validator';

export class AddMusicListDto {
  @IsNotEmpty()
  title: string;
}

export class SetMusicListDto {
  @IsNotEmpty()
  title: string;
}
