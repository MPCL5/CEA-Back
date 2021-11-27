import { IsInt, IsOptional, IsString } from 'class-validator';
import { News } from 'src/domain/News';

export class UpdateNewsDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  brief?: string;

  @IsString()
  @IsOptional()
  text?: string;

  @IsInt()
  @IsOptional()
  eventId?: number;

  static updateNews(source: News, dto: UpdateNewsDto) {
    if (dto.title) {
      source.title = dto.title;
    }
    if (dto.brief) {
      source.brief = dto.brief;
    }
    if (dto.text) {
      source.text = dto.text;
    }

    return source;
  }
}
