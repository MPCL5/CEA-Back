import {
  Injectable,
  ArgumentMetadata,
  ParseIntPipe,
  PipeTransform,
  NotAcceptableException,
} from '@nestjs/common';

@Injectable()
export class ParsePagePipe extends ParseIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value === '' || value === undefined || value === null) {
      return 1;
    } else if (+value === 0) {
      throw new NotAcceptableException('Page must be greater than 0');
    }

    value = super.transform(value, metadata);

    return value;
  }
}
