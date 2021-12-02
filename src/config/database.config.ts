import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Comment } from 'src/domain/Comment';
import { Event } from 'src/domain/Event';
import { Gallery } from 'src/domain/Galleries';
import { GalleryPhoto } from 'src/domain/GalleryPhoto';
import { Media } from 'src/domain/Media';
import { News } from 'src/domain/News';
import { Question } from 'src/domain/Question';
import { Teacher } from 'src/domain/Teacher';
import { User } from 'src/domain/User';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
      User,
      Question,
      News,
      Media,
      Event,
      Comment,
      Teacher,
      Gallery,
      GalleryPhoto,
    ],
    synchronize: true, // shouldn't be used in production
    logging: true,
  }),
);
