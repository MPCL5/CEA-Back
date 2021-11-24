import {
  Injectable,
  ArgumentMetadata,
  ParseIntPipe,
  PipeTransform,
  NotAcceptableException,
} from '@nestjs/common';

@Injectable()
export class ParsePageSizePipe extends ParseIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value === '' || value === undefined || value === null) {
      return 10;
    } else if (+value === 0) {
      throw new NotAcceptableException();
    }

    value = super.transform(value, metadata);

    return value;
  }
}
