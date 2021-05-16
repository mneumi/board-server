import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'linklist',
})
export class LinkListEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: number;

  @Column()
  title: string;
}
