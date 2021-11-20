import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('jwt-token')
@ApiTags('comments')
@Controller('admin/comments')
export class CommentsController {
  @Get()
  async getComments(): Promise<any> {
    return null;
  }

  @Get(':id')
  async getCommentDetails(@Param('id') id: number): Promise<any> {
    return id;
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
