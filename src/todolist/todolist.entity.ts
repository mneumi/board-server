import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'todolist',
})
export class TodoListEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  title: string;
}
