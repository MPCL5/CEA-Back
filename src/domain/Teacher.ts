import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './Event';
import { Media } from './Media';
import { Name } from './Name';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(() => Name)
  name: Name;

  @Column({ type: 'text' })
  bio: string;

  @OneToOne(() => Media)
  @JoinColumn()
  avatar: Media;

  @ManyToMany(() => Event, (event) => event.teachers)
  @JoinTable()
  events: Event[];
}
