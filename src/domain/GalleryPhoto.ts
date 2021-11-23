import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Gallery } from './Galleries';
import { Media } from './Media';

@Entity()
export class GalleryPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Media)
  @JoinColumn()
  media: Media;

  @ManyToOne(() => Gallery, (gallery) => gallery.photoes)
  gallery: Gallery;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
