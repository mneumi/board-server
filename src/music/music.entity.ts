import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  content: string;

  @Column({
    default: false,
  })
  done: boolean;
}
