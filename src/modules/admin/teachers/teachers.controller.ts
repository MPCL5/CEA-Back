import {
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/extentions/guards/JwtAuthGuard ';
import { TeachersService } from './teachers.service';

@ApiBearerAuth('jwt-token')
@ApiTags('teacher')
@UseGuards(JwtAuthGuard)
@Controller('admin/teachers')
export class TeachersController {
  constructor(private readonly teacherService: TeachersService) {}

  @Get()
  getTeachersList() {
    throw new NotImplementedException();
  }

  @Get(':id')
  getTeacherDetails() {
    throw new NotImplementedException();
  }

  @Get(':id/events')
  getTeacherEvents() {
    throw new NotImplementedException();
  }

  @Post()
  createTeacher() {
    throw new NotImplementedException();
  }

  @Put(':id')
  updateTeacher() {
    throw new NotImplementedException();
  }

  @Delete(':id')
  deleteTeacher() {
    throw new NotImplementedException();
  }
}
