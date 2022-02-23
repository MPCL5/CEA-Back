import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/domain/Comment';
import { News } from 'src/domain/News';
import { CommentSeederService } from './comment.service';

/**
 * Import and provide seeder classes.
 *
 * @module
 */
@Module({
  imports: [TypeOrmModule.forFeature([News, Comment])],
  providers: [CommentSeederService],
  exports: [CommentSeederService],
})
export class CommentSeederModule {}
