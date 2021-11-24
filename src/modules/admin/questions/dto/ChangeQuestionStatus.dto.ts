import { QuestionStatus } from 'src/domain/enums/QuestionStatus';
import { IsEnum } from 'class-validator';

export class ChangeQuestionStatusDto {
  /**
   * 1: Pending, 2: NeedAction, 3: Answered, 4: Ignored,
   */
  @IsEnum(QuestionStatus)
  status: QuestionStatus;
}
