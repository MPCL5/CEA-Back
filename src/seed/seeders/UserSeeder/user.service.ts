import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/User';
import Factory from 'src/seed/factory';
import { Repository } from 'typeorm';
import { fakeUserGenerator } from './data';

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Seed all users.
   *
   * @function
   */
  async create(): Promise<Array<Promise<User>>> {
    const factory = new Factory<User>(fakeUserGenerator);
    const created = factory.createMany(10, (index) => ({
      studentCode: `97536100${index}`,
    }));

    await this.userRepository.clear();

    return created.map(async (user) => {
      const dbUser = await this.userRepository.findOne({
        studentCode: user.studentCode,
      });

      if (dbUser) {
        return null;
      }

      return await this.userRepository.save(user);
    });
  }
}
