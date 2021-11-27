import { Exclude } from 'class-transformer';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  // JoinColumn,
  ManyToOne,
  // OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Gallery } from './Galleries';
// import { Media } from './Media';

@Entity()
export class GalleryPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  /* @OneToOne(() => Media, { eager: true })
  @JoinColumn() */
  fileId: number;

  @ManyToOne(() => Gallery, (gallery) => gallery.photoes)
  gallery: Gallery;

  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;
}
