import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/domain/Question';
import { QuestionSeederService } from './question.service';

/**
 * Import and provide seeder classes for questions.
 *
 * @module
 */
@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  providers: [QuestionSeederService],
  exports: [QuestionSeederService],
})
export class QuestionSeederModule {}
