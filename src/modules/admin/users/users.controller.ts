import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/extentions/guards/JwtAuthGuard ';
import UserResultDto from './Dto/UserResult.dto';
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

  @Get('my-profile')
  async getProfile(@Request() req): Promise<UserResultDto> {
    const user = await this.userService.findOne(req.user.studentCode);

    const result = new UserResultDto();
    result.studentCode = user.studentCode;
    result.firstName = user.name.first;
    result.lastName = user.name.last;

    return result;
  }

  @Post('my-profile')
  async editProfile(): Promise<any> {
    return null;
  }

  @Post()
  async createUser(): Promise<any> {
    return null;
  }

  @Get(':id')
  async getUserDetails(@Param('id') id: number): Promise<any> {
    return id;
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
