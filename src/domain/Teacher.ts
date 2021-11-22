import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './Event';
import { Media } from './Media';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  bio: string;

  @OneToOne(() => Media)
  @JoinColumn()
  avatar: Media;

  @ManyToMany(() => Event, (event) => event.teachers)
  events: Event[];
}
