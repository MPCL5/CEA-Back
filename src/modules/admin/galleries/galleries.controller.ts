import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('jwt-token')
@ApiTags('galleries')
@Controller('admin/galleries')
export class GalleriesController {
  @Get()
  async getGalleries(): Promise<any> {
    return null;
  }

  @Get(':id')
  async getGalleryDetails(@Param('id') id: number): Promise<any> {
    return id;
  }

  @Post()
  async createGalley(): Promise<any> {
    return null;
  }

  @Post(':id')
  async updateGallery(@Param('id') id: number): Promise<any> {
    return id;
  }

  @Post(':id/active')
  async activeGallery(@Param('id') id: number): Promise<any> {
    return id;
  }
}
