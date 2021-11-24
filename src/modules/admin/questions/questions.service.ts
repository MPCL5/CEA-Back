import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionStatus } from 'src/domain/enums/QuestionStatus';
import { Question } from 'src/domain/Question';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  getQuestions(take, skip): Promise<[Question[], number]> {
    const questions = this.questionRepository.find({ take, skip });
    const count = this.questionRepository.count();

    return Promise.all([questions, count]);
  }

  getQuestionById(id: number): Promise<Question> {
    return this.questionRepository.findOne(id);
  }

  changeQuestionStatus(
    question: Question,
    status: QuestionStatus,
  ): Promise<Question> {
    question.status = status;

    return this.questionRepository.save(question);
  }
}
