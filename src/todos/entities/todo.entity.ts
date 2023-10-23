import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'todos' })
export class Todo {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
  email: any;
}
