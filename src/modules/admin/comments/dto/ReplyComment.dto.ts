import { IsString } from 'class-validator';

export class ReplyCommentDto {
  @IsString()
  name: string;

  @IsString()
  text: string;
}
