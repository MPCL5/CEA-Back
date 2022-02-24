import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/domain/Event';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  getEvents(take: number, skip: number): Promise<[Event[], number]> {
    const result = this.eventRepository.find({
      take,
      skip,
      select: ['id', 'title', 'brief', 'smallImage'],
    });
    const count = this.eventRepository.count();

    return Promise.all([result, count]);
  }

  getEventDetailsById(id: number, loadRelations = true): Promise<Event> {
    const findOptions: FindOneOptions<Event> = {};

    if (loadRelations) {
      findOptions.relations = ['news', 'teachers'];
    }

    return this.eventRepository.findOne(id, findOptions);
  }
}
