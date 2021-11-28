import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Event } from 'src/domain/Event';
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
@Controller('admin/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiPaginatedResponse(Event)
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'pageSize', required: false, type: 'number' })
  async getEvents(
    @Query('page', ParsePagePipe) page: number,
    @Query('pageSize', ParsePageSizePipe) pageSize: number,
  ): Promise<PaginatedResponse<Event>> {
    const { take, skip } = getPaginatedQueryParam(page, pageSize);
    const [result, count] = await this.eventsService.getEvents(take, skip);

    return {
      list: result,
      total: count,
      page,
      pageSize,
    };
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
