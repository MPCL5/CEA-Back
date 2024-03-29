import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(studentCode: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { studentCode } });
  }

  async getAllUsers(): Promise<User[]> {
    const query = this.usersRepository.find();

    return await query;
  }
}
