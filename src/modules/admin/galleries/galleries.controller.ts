import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Gallery } from 'src/domain/Galleries';
import { GalleryPhoto } from 'src/domain/GalleryPhoto';
import { JwtAuthGuard } from 'src/extentions/guards/JwtAuthGuard ';
import { ParsePagePipe } from 'src/extentions/pipes/ParsePagePipe';
import { ParsePageSizePipe } from 'src/extentions/pipes/ParsePageSizePipe';
import {
  ApiPaginatedResponse,
  getPaginatedQueryParam,
  PaginatedResponse,
} from 'src/utils/Paginated';
import { AddPhotoDto } from './dto/AddPhoto.dto';
import { CreateGalleryDto } from './dto/CreateGallery.dto';
import { UpdateGalleryDto } from './dto/UpdateGallery.dto';
import { GalleriesService } from './galleries.service';

@ApiBearerAuth('jwt-token')
@ApiTags('galleries')
@UseGuards(JwtAuthGuard)
@Controller('admin/galleries')
export class GalleriesController {
  constructor(private readonly galleriesService: GalleriesService) {}

  @Get()
  @ApiPaginatedResponse(Gallery)
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'pageSize', required: false, type: 'number' })
  async getGalleries(
    @Query('page', ParsePagePipe) page: number,
    @Query('pageSize', ParsePageSizePipe) pageSize: number,
  ): Promise<PaginatedResponse<Gallery>> {
    const { take, skip } = getPaginatedQueryParam(page, pageSize);
    const [result, count] = await this.galleriesService.getGalleries(
      take,
      skip,
    );

    return {
      list: result,
      total: count,
      page,
      pageSize,
    };
  }

  @Get(':id')
  async getGalleryDetails(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Gallery> {
    const result = await this.galleriesService.getGalleryById(id);

    if (result === null || result === undefined) {
      throw new NotFoundException();
    }

    return result;
  }

  @Post()
  async createGalley(
    @Body() createGalleryDto: CreateGalleryDto,
  ): Promise<Gallery> {
    const createdGallery = CreateGalleryDto.toGallery(createGalleryDto);

    return await this.galleriesService.createGallery(createdGallery);
  }

  @Post(':id')
  async updateGallery(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGalleryDto: UpdateGalleryDto,
  ): Promise<Gallery> {
    const source = await this.galleriesService.getGalleryById(id);

    if (source === null || source === undefined) {
      throw new NotFoundException();
    }

    const updatedGallery = UpdateGalleryDto.updateGallery(
      source,
      updateGalleryDto,
    );
    const result = await this.galleriesService.updateGallery(updatedGallery);

    return result;
  }

  @Post(':id/photo')
  async addPhotoToGallery(
    @Param('id', ParseIntPipe) id: number,
    @Body() addPhotoDto: AddPhotoDto,
  ) {
    const gallery = await this.galleriesService.getGalleryById(id);

    if (gallery === null || gallery === undefined) {
      throw new NotFoundException();
    }

    // TODO: validate file id. using storage service.

    const result = addPhotoDto.photoes.map((item) => {
      const photo = new GalleryPhoto();
      photo.fileId = item;
      return photo;
    });

    return await this.galleriesService.createPhoto(gallery, result);
  }

  @Delete(':id/photo/:photoId')
  async deletePhotoFromGallery(
    @Param('id', ParseIntPipe) id: number,
    @Param('photoId', ParseIntPipe) photoId: number,
  ) {
    const source = await this.galleriesService.getPhotoById(photoId);

    if (source === null || source === undefined || +source.gallery.id !== +id) {
      throw new NotFoundException();
    }

    await this.galleriesService.deletePhoto(source);
  }

  @Post(':id/active')
  async activeGallery(@Param('id', ParseIntPipe) id: number): Promise<Gallery> {
    const source = await this.galleriesService.getGalleryById(id);

    if (source === null || source === undefined) {
      throw new NotFoundException();
    }

    source.active = !source.active;
    const result = await this.galleriesService.updateGallery(source);

    return result;
  }
}
