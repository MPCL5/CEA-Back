import { Injectable, Logger } from '@nestjs/common';
import { QuestionSeederService } from './seeders/QuestionSeeder/question.service';
import { UserSeederService } from './seeders/UserSeeder/user.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly questionSeederService: QuestionSeederService,
    private readonly userSeederService: UserSeederService,
  ) {}
  async seed() {
    await this.questions()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding questions...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding questions...');
        Promise.reject(error);
      });

    await this.users()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding users...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding users...');
        Promise.reject(error);
      });
  }

  async questions() {
    return await Promise.all(this.questionSeederService.create())
      .then((createdQuestions) => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of questions created : ' +
            // Remove all null values and return only created languages.
            createdQuestions.filter(
              (nullValueOrCreatedLanguage) => nullValueOrCreatedLanguage,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }

  async users() {
    return await Promise.all(this.userSeederService.create())
      .then((createdUsers) => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of users created : ' +
            // Remove all null values and return only created languages.
            createdUsers.filter(
              (nullValueOrCreatedLanguage) => nullValueOrCreatedLanguage,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
}
