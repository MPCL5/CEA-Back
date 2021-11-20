import { Module } from '@nestjs/common';
import { GalleriesController } from './galleries.controller';

@Module({
  controllers: [GalleriesController],
})
export class GalleriesModule {}
