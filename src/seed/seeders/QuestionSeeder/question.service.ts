import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain } from 'class-transformer';
import { Question } from 'src/domain/Question';
import Factory from 'src/seed/factory';
import { Repository } from 'typeorm';
import { fakeQuestionGenerator } from './data';

@Injectable()
export class QuestionSeederService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  /**
   * Seed all languages.
   *
   * @function
   */
  create(): Array<Promise<Question>> {
    const factory = new Factory<Question>(fakeQuestionGenerator);
    const created = factory.createMany(10);

    this.questionRepository.clear();

    return created.map(async (question) => {
      const dbQuestion = await this.questionRepository.findOne(
        classToPlain(question),
      );

      if (dbQuestion) {
        return null;
      }

      return await this.questionRepository.save(question);
    });
  }
}
