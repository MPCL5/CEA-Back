import {
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/extentions/guards/JwtAuthGuard ';
import { TeachersService } from './teachers.service';
import {
  ApiPaginatedResponse,
  getPaginatedQueryParam,
  PaginatedResponse,
} from '../../../utils/Paginated';
import { ParsePagePipe } from '../../../extentions/pipes/ParsePagePipe';
import { ParsePageSizePipe } from '../../../extentions/pipes/ParsePageSizePipe';
import { Teacher } from '../../../domain/Teacher';

@ApiBearerAuth('jwt-token')
@ApiTags('teacher')
@UseGuards(JwtAuthGuard)
@Controller('admin/teachers')
export class TeachersController {
  constructor(private readonly teacherService: TeachersService) {}

  @Get()
  @ApiPaginatedResponse(Teacher)
  async getTeachersList(
    @Query('page', ParsePagePipe) page: number,
    @Query('pageSize', ParsePageSizePipe) pageSize: number,
  ): Promise<PaginatedResponse<Teacher>> {
    const { take, skip } = getPaginatedQueryParam(page, pageSize);
    const queryResult = await this.teacherService.getTeachers(take, skip);

    return new PaginatedResponse<Teacher>(queryResult, page, pageSize);
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
