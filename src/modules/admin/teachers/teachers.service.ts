import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from 'src/domain/Teacher';
import { Repository } from 'typeorm';
import { EventsService } from '../events/events.service';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    private readonly eventService: EventsService,
  ) {}

  async getTeachers(take: number, skip: number): Promise<[Teacher[], number]> {
    return await this.teacherRepository.findAndCount({ take, skip });
  }

  async getTeacherDetails(id: number): Promise<Teacher> {
    const result = await this.teacherRepository.findOne(id, {
      relations: ['events'],
    });

    return result;
  }

  async assignEventToTeacher(
    teacherId: number,
    eventId: number,
  ): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOne(teacherId);

    if (!teacher) {
      throw new NotFoundException('دبیری با id فرستاده شده پیدا نشد.');
    }

    const event = await this.eventService.getEventDetailsById(eventId);

    if (!event) {
      throw new NotFoundException('رویدادی با id فرستاده شده پیدا نشد.');
    }

    teacher.events.push(event);
    await this.teacherRepository.save(teacher);

    return teacher;
  }

  /*  getTeacherEvents(teacherId, take, skip) {
    const querable = this.teacherRepository.createQueryBuilder('teacher');
    querable.where('teacher.id = :id', { id: teacherId }).leftJoinAndMapMany();
  } */
}
