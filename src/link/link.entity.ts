import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'link',
})
export class LinkEnitty {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: number;

  @Column()
  url: string;

  @Column()
  title: string;

  @Column()
  image: string;
}
