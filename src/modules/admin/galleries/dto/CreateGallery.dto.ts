import { IsString } from 'class-validator';
import { Gallery } from 'src/domain/Galleries';

export class CreateGalleryDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  static toGallery(dto: CreateGalleryDto): Gallery {
    const gallery = new Gallery();
    gallery.title = dto.title;
    gallery.description = dto.description;

    return gallery;
  }
}
