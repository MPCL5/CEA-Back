import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './Event';

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

  @OneToOne(() => Event, (event) => event.details)
  event: Event;
}
