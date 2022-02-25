import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from 'src/domain/Teacher';
import { FindOneOptions, Repository } from 'typeorm';
import { EventsService } from '../events/events.service';
import { UpdateTeacherReceiveDto } from './dto/UpdateTeacher.receive.dto';
import { CreateTeacherReceiveDto } from './dto/CreateTeacher.receive.dto';
import { Name } from 'src/domain/Name';

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

  async getTeacherDetailsById(
    id: number,
    loadRelations = true,
  ): Promise<Teacher> {
    const findOneOptions: FindOneOptions = {};

    if (loadRelations) {
      findOneOptions.relations = ['events'];
    }

    const result = await this.teacherRepository.findOne(id, findOneOptions);

    if (!result) {
      throw new NotFoundException('دبیری با id فرستاده شده پیدا نشد.');
    }

    return result;
  }

  async assignEventToTeacher(
    teacherId: number,
    eventId: number,
  ): Promise<Teacher> {
    // TODO: try to find more efficient solution.
    const teacher = await this.getTeacherDetailsById(teacherId);
    const event = await this.eventService.getEventDetailsById(eventId);

    if (!!teacher.events.find((item) => item.id === event.id)) {
      teacher.events = teacher.events.filter((item) => item.id !== event.id);
    } else {
      teacher.events.push(event);
    }

    await this.teacherRepository.save(teacher);
    return teacher;
  }

  async createTeacher(createObject: CreateTeacherReceiveDto): Promise<Teacher> {
    const teacher = new Teacher();
    teacher.name = new Name(createObject.firstName, createObject.lastName);
    // TODO: handle file id here,

    if (!!createObject.bio) {
      teacher.bio = createObject.bio;
    }

    if (!!createObject.jobTitle) {
      teacher.jobTitle = createObject.jobTitle;
    }

    await this.teacherRepository.save(teacher);
    return teacher;
  }

  async updateTeacherInfo(
    teacherId: number,
    updateObj: UpdateTeacherReceiveDto,
  ): Promise<Teacher> {
    const teacher = await this.getTeacherDetailsById(teacherId);

    // TODO: handle file id here,

    if (!!updateObj.bio) {
      teacher.bio = updateObj.bio;
    }

    if (!!updateObj.jobTitle) {
      teacher.jobTitle = updateObj.jobTitle;
    }

    await this.teacherRepository.save(teacher);
    return teacher;
  }

  async deleteTeacher(id: number): Promise<boolean> {
    const teacher = await this.getTeacherDetailsById(id);

    if (teacher.events.length > 0) {
      throw new BadRequestException('دبیر مورد نظر در رویدادی حضور دارد.');
    }

    await this.teacherRepository.remove(teacher);
    return true;
  }
}
