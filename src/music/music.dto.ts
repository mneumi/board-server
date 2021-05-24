import { IsNotEmpty, IsIn } from 'class-validator';
import { MusicLanguage } from './music.interface';

export class AddMusicDto {
  @IsNotEmpty()
  listId: number;

  @IsNotEmpty()
  song: string;

  @IsNotEmpty()
  singer: string;

  @IsNotEmpty()
  coverImg: string;

  @IsNotEmpty()
  songUrl: string;

  @IsIn([MusicLanguage.ENGLISH, MusicLanguage.CHINESE])
  language: MusicLanguage;
}

export class SetMusicDto {
  @IsNotEmpty()
  listId: number;

  @IsNotEmpty()
  song: string;

  @IsNotEmpty()
  singer: string;

  @IsNotEmpty()
  coverImg: string;

  @IsNotEmpty()
  songUrl: string;

  @IsIn(['chinese', 'english'])
  language: MusicLanguage;
}
