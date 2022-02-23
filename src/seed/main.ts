import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Connection } from 'typeorm';
import { SeederModule } from './seeder.module';
import { Seeder } from './seeder.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeederModule);

  const logger = appContext.get(Logger);
  const seeder = appContext.get(Seeder);
  const dbConnection = appContext.get(Connection);

  try {
    await dbConnection.dropDatabase();
    await dbConnection.synchronize();

    await seeder.seed();
    logger.debug('Seeding complete!');
  } catch (error) {
    logger.error('Seeding failed!');
    throw error;
  } finally {
    appContext.close();
  }
}
bootstrap();
