import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Comment } from './Comment';
import { EventStatus } from './enums/EventStatus';
import { Gallery } from './Galleries';
import { News } from './News';
import { Post } from './Post';
import { Teacher } from './Teacher';

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

  @Column({ type: 'varchar', length: 255 })
  location: string;

  @Column({ type: 'mediumint' })
  price: number;

  @Column({ type: 'varchar', length: 255 })
  signUpLink: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  topics: string;

  @Column({ type: 'text' })
  requirenemtns: string;

  @Column()
  smallImage: number;

  @Column()
  bigImage: number;

  @ManyToOne(() => Gallery, (gallery) => gallery.event)
  gallery: Gallery;

  @OneToMany(() => News, (news) => news.event)
  news: News[];

  @OneToMany(() => Comment, (comment) => comment.event)
  comments: Comment[];

  @ManyToMany(() => Teacher, (teacher) => teacher.events)
  teachers: Teacher[];
}
