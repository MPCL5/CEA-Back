import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AdminModule } from './modules/admin/admin.module';
import { ClientModule } from './modules/client/client.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './extentions/transform.interceptor';
import { HttpExceptionFilter } from './extentions/http-exception.filter';
import { PaginatedResponse } from './utils/Paginated';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useStaticAssets(join(process.cwd(), 'storage'), {
    prefix: '/storage/',
  });

  // Swagger for admin panel.
  const swaggerAdminConfig = new DocumentBuilder()
    .setTitle('CEA Admin Back-end')
    .setDescription('The admin API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'jwt-token',
    )
    .build();
  const adminDocument = SwaggerModule.createDocument(app, swaggerAdminConfig, {
    include: [AdminModule],
    extraModels: [PaginatedResponse],
    deepScanRoutes: true,
  });
  SwaggerModule.setup('/swagger/admin', app, adminDocument);

  // swagger for client panel.
  const swaggerClientConfig = new DocumentBuilder()
    .setTitle('CEA Client Back-end')
    .setDescription('The client API description')
    .setVersion('1.0')
    .build();
  const clientDocument = SwaggerModule.createDocument(
    app,
    swaggerClientConfig,
    { include: [ClientModule], extraModels: [PaginatedResponse] },
  );
  SwaggerModule.setup('/swagger/client', app, clientDocument, {});

  await app.listen(8080);
}
bootstrap();
