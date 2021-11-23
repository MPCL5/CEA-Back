import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Comment } from 'src/domain/Comment';
import { CommentsService } from './comments.service';

@ApiBearerAuth('jwt-token')
@ApiTags('comments')
@Controller('admin/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getComments(): Promise<any> {
    return null;
  }

  @Get(':id')
  async getCommentDetails(@Param('id') id: number): Promise<Comment> {
    return await this.commentsService.getCommentById(id);
  }

  @Post(':id')
  async replyToComment(@Param('id') id: number): Promise<any> {
    return id;
  }

  @Post(':id/status')
  async changeCommentStatus(@Param('id') id: number): Promise<any> {
    return id;
  }
}
