import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './Event';
import { Media } from './Media';
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

  @Column({ default: false })
  admited: boolean;

  @OneToOne(() => Media)
  @JoinColumn()
  smallImage: Media;

  @ManyToOne(() => Event, (event) => event.comments, { nullable: true })
  event: Event;

  @ManyToOne(() => News, (comment) => comment.comments, { nullable: true })
  news: News;

  @ManyToOne(() => Comment, (comment) => comment.replies)
  replyTo: Comment;

  @OneToMany(() => Comment, (comment) => comment.replyTo, { eager: true })
  replies: Comment[];

  @CreateDateColumn()
  createdAt: Date;
}
