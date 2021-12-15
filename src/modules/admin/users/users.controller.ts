import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/extentions/guards/JwtAuthGuard ';
import { UsersService } from './users.service';

@ApiBearerAuth('jwt-token')
@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('admin/users')
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

  @Post('my-profile')
  async editProfile(): Promise<any> {
    return null;
  }

  @Post()
  async createUser(): Promise<any> {
    return null;
  }

  @Post(':id')
  async updateUser(@Param('id') id: number): Promise<any> {
    return id;
  }

  @Post(':id/active')
  async activeUser(@Param('id') id: number): Promise<any> {
    return id;
  }
}
