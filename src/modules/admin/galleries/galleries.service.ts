import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gallery } from 'src/domain/Galleries';
import { GalleryPhoto } from 'src/domain/GalleryPhoto';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class GalleriesService {
  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepository: Repository<Gallery>,
    @InjectRepository(GalleryPhoto)
    private readonly photoRespository: Repository<GalleryPhoto>,
  ) {}

  getGalleries(take: number, skip: number): Promise<[Gallery[], number]> {
    const result = this.galleryRepository.find({ take, skip });
    const count = this.galleryRepository.count();

    return Promise.all([result, count]);
  }

  getGalleryById(id: number, loadPhotoes = false): Promise<Gallery> {
    const findOptions: FindOneOptions<Gallery> = { relations: ['photoes'] };

    if (loadPhotoes) {
      findOptions.relations = ['photoes'];
    }

    return this.galleryRepository.findOne(id, findOptions);
  }

  createGallery(gallery: Gallery): Promise<Gallery> {
    if (gallery.id) {
      gallery.id = undefined;
    }

    return this.galleryRepository.save(gallery);
  }

  updateGallery(gallery: Gallery): Promise<Gallery> {
    return this.galleryRepository.save(gallery);
  }

  getPhotoById(id: number): Promise<GalleryPhoto> {
    return this.photoRespository.findOne(id, { relations: ['gallery'] });
  }

  async createPhoto(gallery: Gallery, photos: GalleryPhoto[]) {
    await this.photoRespository.save(photos);
    gallery.photoes.push(...photos);
    return await this.galleryRepository.save(gallery);
  }

  deletePhoto(photo: GalleryPhoto) {
    return this.photoRespository.softDelete(photo.id);
  }
}
