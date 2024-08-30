import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  
  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('This is API for simple blog app')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('User Collection', 'User API Collection')
    .addTag('Post Collection', 'Post API Collection')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(port);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
