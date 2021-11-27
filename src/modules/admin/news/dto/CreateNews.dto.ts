import { IsInt, IsOptional, IsString } from 'class-validator';
import { News } from 'src/domain/News';

export class CreateNewsDto {
  @IsString()
  title: string;

  @IsString()
  brief: string;

  @IsString()
  text: string;

  @IsInt()
  @IsOptional()
  eventId?: number;

  static toNews(dto: CreateNewsDto): News {
    const result = new News();
    result.title = dto.title;
    result.brief = dto.brief;
    result.text = dto.text;

    return result;
  }
}
