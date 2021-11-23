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

  @OneToOne(() => Media)
  @JoinColumn()
  bigImage: Media;

  @OneToOne(() => Event, (event) => event.details)
  event: Event;
}
