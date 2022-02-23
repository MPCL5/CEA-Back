import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/domain/Comment';
import { News } from 'src/domain/News';
import { CommentSeederModule } from '../CommentSeeder/comment.module';
import { NewsSeederService } from './news.service';

/**
 * Import and provide seeder classes for Users.
 *
 * @module
 */
@Module({
  imports: [TypeOrmModule.forFeature([News, Comment]), CommentSeederModule],
  providers: [NewsSeederService],
  exports: [NewsSeederService],
})
export class NewsSeederModule {}
