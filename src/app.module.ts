import { Module } from '@nestjs/common';
import { ClientModule } from './modules/client/client.module';
import { AdminModule } from './modules/admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.production', '.env.development', '.env'],
      isGlobal: true,
    }),
    DatabaseModule,
    ClientModule,
    AdminModule,
  ],
})
export class AppModule {}
