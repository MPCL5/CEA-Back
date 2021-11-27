import {
  Body,
  Controller,
  Get,
  NotAcceptableException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Comment } from 'src/domain/Comment';
import { ParsePagePipe } from 'src/extentions/pipes/ParsePagePipe';
import { ParsePageSizePipe } from 'src/extentions/pipes/ParsePageSizePipe';
import {
  ApiPaginatedResponse,
  getPaginatedQueryParam,
  PaginatedResponse,
} from 'src/utils/Paginated';
import { CommentsService } from './comments.service';
import { ReplyCommentDto } from './dto/ReplyComment.dto';

@ApiBearerAuth('jwt-token')
@ApiTags('comments')
@Controller('admin/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  /**
   * a list of comments
   * @returns PaginatedResponse<Comment>
   */
  @Get()
  @ApiPaginatedResponse(Comment)
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'pageSize', required: false, type: 'number' })
  async getComments(
    @Query('page', ParsePagePipe) page: number,
    @Query('pageSize', ParsePageSizePipe) pageSize: number,
  ): Promise<PaginatedResponse<Comment>> {
    const { take, skip } = getPaginatedQueryParam(page, pageSize);
    const [comments, count] = await this.commentsService.getComments(
      take,
      skip,
    );

    return {
      list: comments,
      total: count,
      page,
      pageSize,
    };
  }

  @Get(':id')
  async getCommentDetails(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Comment> {
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
    @Param('id', ParseIntPipe) id: number,
    @Body() commet: ReplyCommentDto,
  ): Promise<Comment> {
    const result = await this.commentsService.getCommentById(id, false);

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

    return resultComment;
  }

  @Post(':id/admit')
  async changeCommentStatus(@Param('id', ParseIntPipe) id: number) {
    const result = await this.commentsService.getCommentById(id, false);

    if (result === null || result === undefined) {
      throw new NotFoundException();
    }

    result.admited = !result.admited;

    return await this.commentsService.updateComment(result);
  }
}
