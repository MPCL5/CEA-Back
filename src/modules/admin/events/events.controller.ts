import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('jwt-token')
@ApiTags('events')
@Controller('admin/events')
export class EventsController {
  @Get()
  async getEvents(): Promise<any> {
    return null;
  }

  @Get(':id')
  async getEventDetails(@Param('id') id: number): Promise<any> {
    return id;
  }

  @Get(':id/comments')
  async getEventComments(@Param('id') id: number): Promise<any> {
    return id;
  }

  @Post()
  async createEvent(): Promise<any> {
    return null;
  }

  @Post(':id')
  async updateEvent(@Param('id') id: number): Promise<any> {
    return id;
  }

  @Delete('id')
  async deleteEvent(@Param('id') id: number): Promise<any> {
    return id;
  }
}
