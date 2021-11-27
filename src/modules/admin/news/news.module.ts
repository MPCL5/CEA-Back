import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/domain/Comment';
import { Event } from 'src/domain/Event';
import { News } from 'src/domain/News';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [TypeOrmModule.forFeature([News, Event, Comment])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
