import { UpdateTeacherReceiveDto } from './UpdateTeacher.receive.dto';
import { IsString } from 'class-validator';

export class CreateTeacherReceiveDto extends UpdateTeacherReceiveDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
