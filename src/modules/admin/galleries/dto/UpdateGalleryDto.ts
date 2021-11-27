import { Gallery } from 'src/domain/Galleries';
import { CreateGalleryDto } from './CreateGallery.dto';

export class UpdateGalleryDto extends CreateGalleryDto {
  static updateGallery(
    source: Gallery,
    updateGalleryDto: CreateGalleryDto,
  ): Gallery {
    if (!!updateGalleryDto.title) {
      source.title = updateGalleryDto.title;
    }
    if (!!updateGalleryDto.description) {
      source.description = updateGalleryDto.description;
    }

    return source;
  }
}
