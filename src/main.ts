import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { logger } from './common/middleware/logger.middleware';

/**
 * Bootstrap the application
 *
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors: true});
  
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist:true
    }
  ));

  const options = new DocumentBuilder()
    .setTitle('Leave REST API')
    .setDescription('This is API for leave service')
    .setVersion('1.0')
    .addTag('leave')
    .addBearerAuth('Authorization', 'header','apiKey') 
    .build();

  const document = SwaggerModule.createDocument(app, options);
  app.use(logger);
  
  SwaggerModule.setup('api/docs', app, document);
  
  await app.listen(3000);
}
bootstrap();
