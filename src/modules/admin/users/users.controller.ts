import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiBearerAuth('jwt-token')
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsers(): Promise<any> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserDetails(@Param('id') id: number): Promise<any> {
    return id;
  }

  @Get('my-profile')
  async getProfile(): Promise<null> {
    return null;
  }

  @Put('my-profile')
  async editProfile(): Promise<any> {
    return null;
  }

  @Post()
  async createUser(): Promise<any> {
    return null;
  }

  @Put()
  async updateUser(): Promise<any> {
    return null;
  }

  @Post(':id/active')
  async activeUser(@Param('id') id: number): Promise<any> {
    return id;
  }
}
