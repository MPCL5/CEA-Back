import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Event } from 'src/domain/Event';
import { JwtAuthGuard } from 'src/extentions/guards/JwtAuthGuard ';
import { ParsePagePipe } from 'src/extentions/pipes/ParsePagePipe';
import { ParsePageSizePipe } from 'src/extentions/pipes/ParsePageSizePipe';
import {
  ApiPaginatedResponse,
  getPaginatedQueryParam,
  PaginatedResponse,
} from 'src/utils/Paginated';
import { EventsService } from './events.service';

@ApiBearerAuth('jwt-token')
@ApiTags('events')
@UseGuards(JwtAuthGuard)
@Controller('admin/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiPaginatedResponse(Event)
  async getEvents(
    @Query('page', ParsePagePipe) page: number,
    @Query('pageSize', ParsePageSizePipe) pageSize: number,
  ): Promise<PaginatedResponse<Event>> {
    const { take, skip } = getPaginatedQueryParam(page, pageSize);
    const queryResult = await this.eventsService.getEvents(take, skip);

    return new PaginatedResponse<Event>(queryResult, page, pageSize);
  }

  @Get(':id')
  async getEventDetails(@Param('id', ParseIntPipe) id: number): Promise<Event> {
    const result = await this.eventsService.getEventDetailsById(id);

    if (result === null || result === undefined) {
      throw new NotFoundException();
    }

    return result;
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
