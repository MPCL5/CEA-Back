import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { QuestionStatus } from './enums/QuestionStatus';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 191 })
  name: string;

  @Column()
  contact: string; // email or phone.

  @Column({ type: 'text' })
  text: string;

  @Column({
    type: 'enum',
    enum: QuestionStatus,
    default: QuestionStatus.NeedAction,
  })
  status: QuestionStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  udpateAt: Date;
}
