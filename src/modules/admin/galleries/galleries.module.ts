import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gallery } from 'src/domain/Galleries';
import { GalleryPhoto } from 'src/domain/GalleryPhoto';
import { GalleriesController } from './galleries.controller';
import { GalleriesService } from './galleries.service';

@Module({
  imports: [TypeOrmModule.forFeature([Gallery, GalleryPhoto])],
  controllers: [GalleriesController],
  providers: [GalleriesService],
})
export class GalleriesModule {}
