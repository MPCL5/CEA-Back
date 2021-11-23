import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Comment } from './Comment';
import { Event } from './Event';
import { Post } from './Post';

@Entity()
export class News extends Post {
  @Column()
  title: string;

  @Column({ type: 'text' })
  text: string;

  @Column()
  brief: string;

  @ManyToOne(() => Event, (event) => event.news, { nullable: true })
  event: Event;

  @OneToMany(() => Comment, (comment) => comment.news, { nullable: true })
  comments: Comment[];
}
