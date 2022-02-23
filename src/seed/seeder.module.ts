import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/modules/database/database.module';
import { Seeder } from './seeder.service';
import { CommentSeederModule } from './seeders/CommentSeeder/comment.module';
import { NewsSeederModule } from './seeders/NewsSeeder/news.module';
import { QuestionSeederModule } from './seeders/QuestionSeeder/question.module';
import { UserSeederModule } from './seeders/UserSeeder/user.module';

/**
 * Import and provide seeder classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.production', '.env.development', '.env'],
      isGlobal: true,
    }),
    CommentSeederModule,
    DatabaseModule,
    QuestionSeederModule,
    UserSeederModule,
    NewsSeederModule,
  ],
  providers: [Logger, Seeder],
})
export class SeederModule {}
