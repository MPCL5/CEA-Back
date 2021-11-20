import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('jwt-token')
@ApiTags('questions')
@Controller('admin/questions')
export class QuestionsController {
  @Get()
  async getQuestions(): Promise<any> {
    return null;
  }

  @Get(':id')
  async getQuestion(@Param('id') id: number): Promise<any> {
    return id;
  }

  @Post(':id/read')
  async answerQuestion(@Param('id') id: number): Promise<any> {
    return id;
  }
}
