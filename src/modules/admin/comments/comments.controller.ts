import {
  Body,
  Controller,
  Get,
  NotAcceptableException,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Comment } from 'src/domain/Comment';
import { CommentsService } from './comments.service';
import { ReplyCommentDto } from './dto/reply-comment.dto';

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
    const result = await this.commentsService.getCommentById(id);

    if (result === null || result === undefined) {
      throw new NotFoundException();
    }

    // TODO: find a better way to do this.
    result.replyTo = undefined;

    return result;
  }

  @Post(':id')
  async replyToComment(
    @Param('id') id: number,
    @Body() commet: ReplyCommentDto,
  ): Promise<Comment> {
    const result = await this.commentsService.getCommentById(id);

    if (result === null || result === undefined) {
      throw new NotFoundException();
    }

    if (result.replyTo) {
      throw new NotAcceptableException();
    }

    const replayComment = new Comment();

    replayComment.name = commet.name;
    replayComment.text = commet.text;
    replayComment.admited = true;
    replayComment.isAdminAnswer = true;

    const resultComment = await this.commentsService.replyToCommnet(
      result,
      replayComment,
    );

    // TODO: find a better way to do this.
    resultComment.replyTo = undefined;

    return resultComment;
  }

  @Post(':id/admit')
  async changeCommentStatus(@Param('id') id: number) {
    const result = await this.commentsService.getCommentById(id, false);

    if (result === null || result === undefined) {
      throw new NotFoundException();
    }

    result.admited = !result.admited;

    return await this.commentsService.updateComment(result);
  }
}
