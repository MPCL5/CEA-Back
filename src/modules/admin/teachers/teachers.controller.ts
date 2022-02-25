import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/extentions/guards/JwtAuthGuard ';
import { TeachersService } from './teachers.service';
import { UpdateTeacherReceiveDto } from './dto/UpdateTeacher.receive.dto';
import { CreateTeacherReceiveDto } from './dto/CreateTeacher.receive.dto';
import { Teacher } from 'src/domain/Teacher';
import { ParsePageSizePipe } from 'src/extentions/pipes/ParsePageSizePipe';
import {
  ApiPaginatedResponse,
  getPaginatedQueryParam,
  PaginatedResponse,
} from 'src/utils/Paginated';
import { ParsePagePipe } from 'src/extentions/pipes/ParsePagePipe';

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
  async getTeacherDetails(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Teacher> {
    return await this.teacherService.getTeacherDetailsById(id);
  }

  @Patch(':id/event')
  async assignEventToTeacher(
    @Param('id', ParseIntPipe) id: number,
    @Query('eventId', ParseIntPipe) eventId: number,
  ): Promise<Teacher> {
    const actionsResult = await this.teacherService.assignEventToTeacher(
      id,
      eventId,
    );

    if (actionsResult) {
      return this.teacherService.getTeacherDetailsById(id);
    } else {
      throw new BadRequestException('خطا در انجام عملیات');
    }
  }

  @Post()
  async createTeacher(
    @Body() createDto: CreateTeacherReceiveDto,
  ): Promise<Teacher> {
    return await this.teacherService.createTeacher(createDto);
  }

  @Put(':id')
  async updateTeacher(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateTeacherReceiveDto,
  ): Promise<Teacher> {
    return await this.teacherService.updateTeacherInfo(id, updateDto);
  }

  @Delete(':id')
  async deleteTeacher(@Param('id', ParseIntPipe) id: number) {
    return await this.teacherService.deleteTeacher(id);
  }
}
