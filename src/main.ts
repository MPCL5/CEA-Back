import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AdminModule } from './modules/admin/admin.module';
import { ClientModule } from './modules/client/client.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
    { include: [ClientModule] },
  );
  SwaggerModule.setup('/swagger/client', app, clientDocument);

  await app.listen(8080);
}
bootstrap();
