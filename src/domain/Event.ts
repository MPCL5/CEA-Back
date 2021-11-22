import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Comment } from './Comment';
import { EventStatus } from './enums/EventStatus';
import { EventDetails } from './EventDetails';
import { News } from './News';
import { Post } from './Post';

@Entity()
export class Event extends Post {
  @Column()
  title: string;

  @Column()
  brief: string;

  @Column({ type: 'simple-array' })
  dates: Date[];

  @Column({ type: 'enum', enum: EventStatus })
  status: EventStatus;

  @OneToMany(() => News, (news) => news.event)
  news: News[];

  @OneToMany(() => Comment, (comment) => comment.event)
  comments: Comment[];

  @OneToOne(() => EventDetails)
  @JoinColumn()
  details: EventDetails;
}
