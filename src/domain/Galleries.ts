import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GalleryPhoto } from './GalleryPhoto';

@Entity()
export class Gallery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => GalleryPhoto, (photo) => photo.gallery)
  photoes: GalleryPhoto[];
}
