import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/domain/Comment';
import { Event } from 'src/domain/Event';
import { News } from 'src/domain/News';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private readonly newsRepository: Repository<News>,
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  getNews(take: number, skip: number): Promise<[News[], number]> {
    const result = this.newsRepository.find({
      take,
      skip,
      select: ['id', 'title', 'brief', 'createdAt', 'updateAt'],
    });
    const count = this.newsRepository.count();

    return Promise.all([result, count]);
  }

  getNewsById(id: number, loadRelations = false): Promise<News> {
    const findOptions: FindOneOptions<News> = {};

    if (loadRelations) {
      findOptions.relations = ['event'];
    }

    return this.newsRepository.findOne(id, findOptions);
  }

  private saveListNews(newsList: News[], isNew: boolean): Promise<News[]> {
    if (isNew) {
      newsList = newsList.map((item) => {
        if (item.id) {
          item.id = undefined;
        }

        return item;
      });
    }

    return this.newsRepository.save(newsList);
  }

  private async saveOneNews(news: News, isNew: boolean) {
    const result = await this.saveListNews([news], isNew);

    return result[0];
  }

  async saveNews(news: News, isNew: boolean): Promise<News>;
  async saveNews(news: News[], isNew: boolean): Promise<News[]>; // i think this function is useless :)

  async saveNews(news: any, isNew: boolean) {
    if (Array.isArray(news)) {
      return this.saveListNews(news, isNew);
    } else {
      return this.saveOneNews(news, isNew);
    }
  }

  deleteNews(news: News) {
    return this.newsRepository.softDelete(news.id);
  }

  getEventById(id: number) {
    return this.eventsRepository.findOne(id);
  }

  /* 
  saveEvent(event: Event) {
    return this.eventsRepository.save(event);
  } 
  */

  getNewsComments(news: News, take, skip): Promise<[Comment[], number]> {
    const where = { news: { id: news.id } };
    const result = this.commentsRepository.find({
      take,
      skip,
      where,
      relations: ['replies'],
    });
    const count = this.commentsRepository.count({ where });

    return Promise.all([result, count]);
  }
}
