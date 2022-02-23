import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from 'src/domain/News';
import Factory from 'src/seed/factory';
import { Repository } from 'typeorm';
import { CommentSeederService } from '../CommentSeeder/comment.service';
import { fakeNewsGenerator } from './data';

@Injectable()
export class NewsSeederService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    private readonly commentSeederService: CommentSeederService,
  ) {}

  /**
   * Seed all News.
   *
   * @function
   */
  async create(): Promise<Promise<News>[]> {
    const factory = new Factory<News>(fakeNewsGenerator);
    const created = factory.createMany(10);

    return created.map(async (news) => {
      const createdEntity = await this.newsRepository.save(news);

      if (Math.random() > 0.5) {
        const comments = this.commentSeederService.createMany(
          2 + Math.ceil(10 * Math.random()),
          () => ({ news: createdEntity }),
        );

        await Promise.all(comments);
      }

      return createdEntity;
    });
  }
}
