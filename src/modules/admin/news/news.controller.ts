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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Comment } from 'src/domain/Comment';
import { News } from 'src/domain/News';
import { JwtAuthGuard } from 'src/extentions/guards/JwtAuthGuard ';
import { ParsePagePipe } from 'src/extentions/pipes/ParsePagePipe';
import { ParsePageSizePipe } from 'src/extentions/pipes/ParsePageSizePipe';
import {
  ApiPaginatedResponse,
  getPaginatedQueryParam,
  PaginatedResponse,
} from 'src/utils/Paginated';
import { CreateNewsDto } from './dto/CreateNews.dto';
import { UpdateNewsDto } from './dto/UpdateNews.dto';
import { NewsService } from './news.service';

@ApiBearerAuth('jwt-token')
@ApiTags('news')
@UseGuards(JwtAuthGuard)
@Controller('admin/news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiPaginatedResponse(News)
  async getNews(
    @Query('page', ParsePagePipe) page: number,
    @Query('pageSize', ParsePageSizePipe) pageSize: number,
  ): Promise<PaginatedResponse<News>> {
    const { take, skip } = getPaginatedQueryParam(page, pageSize);
    const queryResult = await this.newsService.getNews(take, skip);

    return new PaginatedResponse<News>(queryResult, page, pageSize);
  }

  @Get(':id')
  async getNewsDetails(@Param('id', ParseIntPipe) id: number): Promise<News> {
    const result = await this.newsService.getNewsById(id, true);

    if (result === null || result === undefined) {
      throw new NotFoundException();
    }

    return result;
  }

  @Get(':id/comments')
  @ApiPaginatedResponse(Comment)
  async getNewsComments(
    @Param('id', ParseIntPipe) id: number,
    @Query('page', ParsePagePipe) page: number,
    @Query('pageSize', ParsePageSizePipe) pageSize: number,
  ): Promise<PaginatedResponse<Comment>> {
    const news = await this.newsService.getNewsById(id);

    if (news === null || news === undefined) {
      throw new NotFoundException();
    }

    const { take, skip } = getPaginatedQueryParam(page, pageSize);
    const queryResult = await this.newsService.getNewsComments(
      news,
      take,
      skip,
    );

    return new PaginatedResponse<Comment>(queryResult, page, pageSize);
  }

  @Post()
  async createNews(@Body() createNewsDto: CreateNewsDto): Promise<News> {
    const news = CreateNewsDto.toNews(createNewsDto);

    if (createNewsDto.eventId) {
      const event = await this.newsService.getEventById(createNewsDto.eventId);

      if (event === null || event === undefined) {
        throw new NotFoundException();
      }

      news.event = event;
    }

    const result = await this.newsService.saveNews(news, true);

    return result;
  }

  @Post(':id')
  async updateNews(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNewsDto: UpdateNewsDto,
  ): Promise<News> {
    const rawNews = await this.newsService.getNewsById(id);

    if (rawNews === null || rawNews === undefined) {
      throw new NotFoundException();
    }

    const news = UpdateNewsDto.updateNews(rawNews, updateNewsDto);

    if (updateNewsDto.eventId) {
      const event = await this.newsService.getEventById(updateNewsDto.eventId);

      if (event === null || event === undefined) {
        throw new NotFoundException();
      }

      news.event = event;
    }

    return this.newsService.saveNews(news, false);
  }

  @Delete(':id')
  async deleteNews(@Param('id', ParseIntPipe) id: number) {
    const news = await this.newsService.getNewsById(id);

    if (news === null || news === undefined) {
      throw new NotFoundException();
    }

    await this.newsService.deleteNews(news);
  }
}
