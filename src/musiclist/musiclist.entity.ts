import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'musiclist',
})
export class MusicListEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  title: string;
}
