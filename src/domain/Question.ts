import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionStatus } from './enums/QuestionStatus';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  contact: string;

  @Column()
  text: string;

  @Column({ type: 'enum', enum: QuestionStatus })
  status: QuestionStatus;

  @CreateDateColumn()
  createdAt: Date;
}
