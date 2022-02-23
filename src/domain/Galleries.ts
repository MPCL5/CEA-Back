import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './Event';
import { GalleryPhoto } from './GalleryPhoto';

@Entity()
export class Gallery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => Event, (event) => event.gallery)
  event: Event[];

  @OneToMany(() => GalleryPhoto, (photo) => photo.gallery)
  photoes: GalleryPhoto[];
}
