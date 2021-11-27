import { IsArray } from 'class-validator';

export class AddPhotoDto {
  /**
   * file IDs
   */
  @IsArray()
  photoes: number[];
}
