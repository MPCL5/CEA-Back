import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateTeacherReceiveDto {
  @IsOptional()
  @IsString()
  jobTitle?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsUUID()
  avatarFileId?: string;
}
