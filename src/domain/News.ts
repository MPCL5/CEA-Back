import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Comment } from './Comment';
import { Event } from './Event';
import { Media } from './Media';
import { Post } from './Post';

@Entity()
export class News extends Post {
  @Column()
  title: string;

  @Column()
  text: string;

  @OneToOne(() => Media)
  @JoinTable()
  smallImage: Media;

  @ManyToOne(() => Event, (event) => event.news, { nullable: true })
  event: Event;

  @OneToMany(() => Comment, (comment) => comment.news, { nullable: true })
  comments: Comment[];
}
