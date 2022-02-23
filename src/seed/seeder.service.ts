import { Injectable, Logger } from '@nestjs/common';
import { NewsSeederService } from './seeders/NewsSeeder/news.service';
import { QuestionSeederService } from './seeders/QuestionSeeder/question.service';
import { UserSeederService } from './seeders/UserSeeder/user.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly questionSeederService: QuestionSeederService,
    private readonly userSeederService: UserSeederService,
    private readonly newsSeederService: NewsSeederService,
  ) {}

  private async processResult<T>(
    seederRunner: () => Promise<Promise<T>[]> | Promise<T>[],
  ): Promise<boolean> {
    const created = await Promise.all(await seederRunner());
    this.logger.debug(
      'No. of users created : ' +
        // Remove all null values and return only created.
        created.filter((nullValueOrCreated) => nullValueOrCreated).length,
    );
    return true;
  }

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

    await this.news()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding news...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding news...');
        Promise.reject(error);
      });
  }

  async questions() {
    return await this.processResult(() => this.questionSeederService.create());
  }

  async users() {
    return await this.processResult(() => this.userSeederService.create());
  }

  async news() {
    return await this.processResult(() => this.newsSeederService.create());
  }
}
