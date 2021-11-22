import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './Event';
// import { Media } from './Media';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  /*  @Column()
  avatar: Media; */

  @Column()
  bio: string;

  events: Event;
}
