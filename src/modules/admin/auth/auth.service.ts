import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { User } from 'src/domain/User';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    studentCode: string,
    password: string,
  ): Promise<Partial<User> | null> {
    const user = await this.usersService.findOne(studentCode);
    const isPasswordRight = await compare(password, user.password);

    if (user && isPasswordRight) {
      const { password: _, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload = { studentCode: user.studentCode, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
