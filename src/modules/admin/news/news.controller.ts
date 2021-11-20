import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('jwt-token')
@ApiTags('news')
@Controller('admin/news')
export class NewsController {
  @Get()
  async getNews(): Promise<any> {
    return null;
  }

  @Get(':id')
  async getNewsDetails(@Param('id') id: number): Promise<any> {
    return id;
  }

  @Get(':id/comments')
  async getNewsComments(@Param('id') id: number): Promise<any> {
    return id;
  }

  @Post()
  async createNews(): Promise<any> {
    return null;
  }

  @Post(':id')
  async updateNews(@Param('id') id: number): Promise<any> {
    return id;
  }

  @Delete(':id')
  async deleteNews(@Param('id') id: number): Promise<any> {
    return id;
  }
}
