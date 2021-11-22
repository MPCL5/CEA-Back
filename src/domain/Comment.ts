import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './Event';
import { News } from './News';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  text: string;

  @Column({ default: false })
  isAdminAnswer: boolean;

  @ManyToOne(() => Event, (event) => event.comments, { nullable: true })
  event: Event;

  @ManyToOne(() => News, (comment) => comment.comments, { nullable: true })
  news: News;

  @CreateDateColumn()
  createdAt: Date;
}
