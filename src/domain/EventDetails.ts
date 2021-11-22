import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './Event';
import { Media } from './Media';

@Entity()
export class EventDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column()
  price: number;

  @Column()
  signUpLink: string;

  @Column()
  topics: string;

  @Column()
  requirenemtns: string;

  @OneToOne(() => Media)
  @JoinColumn()
  bigImage: Media;

  @OneToOne(() => Event, (event) => event.details)
  event: Event;
}
