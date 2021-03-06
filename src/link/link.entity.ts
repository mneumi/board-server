import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'link',
})
export class LinkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  listId: number;

  @Column()
  url: string;

  @Column()
  title: string;

  @Column({
    default: '',
  })
  image: string;
}
