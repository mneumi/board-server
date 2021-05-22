import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MusicLanguage } from './music.interface';

@Entity({
  name: 'music',
})
export class MusicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  listId: number;

  @Column()
  song: string;

  @Column()
  singer: string;

  @Column()
  coverImg: string;

  @Column()
  songUrl: string;

  @Column({
    type: 'enum',
    enum: MusicLanguage,
  })
  language: MusicLanguage;
}
