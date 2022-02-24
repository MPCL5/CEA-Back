import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Question } from 'src/domain/Question';
import { JwtAuthGuard } from 'src/extentions/guards/JwtAuthGuard ';
import { ParsePagePipe } from 'src/extentions/pipes/ParsePagePipe';
import { ParsePageSizePipe } from 'src/extentions/pipes/ParsePageSizePipe';
import {
  ApiPaginatedResponse,
  getPaginatedQueryParam,
  PaginatedResponse,
} from 'src/utils/Paginated';
import { ChangeQuestionStatusDto } from './dto/ChangeQuestionStatus.dto';
import { QuestionsService } from './questions.service';

@ApiBearerAuth('jwt-token')
@ApiTags('questions')
@UseGuards(JwtAuthGuard)
@Controller('admin/questions')
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  @Get()
  @ApiPaginatedResponse(Question)
  async getQuestions(
    @Query('page', ParsePagePipe) page: number,
    @Query('pageSize', ParsePageSizePipe) pageSize: number,
  ): Promise<PaginatedResponse<Question>> {
    const { take, skip } = getPaginatedQueryParam(page, pageSize);
    const queryResult = await this.questionService.getQuestions(take, skip);

    return new PaginatedResponse<Question>(queryResult, page, pageSize);
  }

  @Get(':id')
  async getQuestion(@Param('id', ParseIntPipe) id: number): Promise<Question> {
    const result = await this.questionService.getQuestionById(id);

    if (result === null || result === undefined) {
      throw new NotFoundException();
    }

    return result;
  }

  @Post(':id/status')
  async answerQuestion(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ChangeQuestionStatusDto,
  ): Promise<any> {
    const result = await this.questionService.getQuestionById(id);

    if (result === null || result === undefined) {
      throw new NotFoundException();
    }

    await this.questionService.changeQuestionStatus(result, body.status);

    return result;
  }
}
