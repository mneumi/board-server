import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'linklist',
})
export class LinkListEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  title: string;
}
