import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from 'src/domain/Teacher';
import { Repository } from 'typeorm';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  /*  getTeacherEvents(teacherId, take, skip) {
    const querable = this.teacherRepository.createQueryBuilder('teacher');
    querable.where('teacher.id = :id', { id: teacherId }).leftJoinAndMapMany();
  } */
}
