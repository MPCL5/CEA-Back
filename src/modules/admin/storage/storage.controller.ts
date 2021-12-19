import {
  Controller,
  NotAcceptableException,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { extension } from 'mime-types';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/extentions/guards/JwtAuthGuard ';
import { v4 as uuidv4 } from 'uuid';

@ApiBearerAuth('jwt-token')
@ApiTags('storage')
@UseGuards(JwtAuthGuard)
@Controller('admin/storage')
export class StorageController {
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 6, {
      storage: diskStorage({
        destination: 'storage',
        filename: (_, file, cb) => {
          const fileFormat = extension(file.mimetype);
          const fileName = uuidv4();

          if (!fileFormat) {
            return cb(
              new NotAcceptableException('فایل آپلود شده فاقذ تایپ می‌باشد.'),
              null,
            );
          }

          cb(null, `${fileName}.${fileFormat}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>): string[] {
    const result = files.map((item) => item.filename);

    return result;
  }

  // TODO: add delete file.
}
