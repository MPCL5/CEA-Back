import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/modules/database/database.module';
import { Seeder } from './seeder.service';
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
    DatabaseModule,
    QuestionSeederModule,
    UserSeederModule,
  ],
  providers: [Logger, Seeder],
})
export class SeederModule {}
