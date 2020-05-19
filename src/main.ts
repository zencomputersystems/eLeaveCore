import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { logger } from './common/middleware/logger.middleware';
/** dot env library */
const dotenv = require('dotenv');
dotenv.config();
/**
 * Bootstrap the application
 *
 * port = process.env.PORT || 3000;
 * 
 * host: process.env.SMTPHOST || "smtp.ethereal.email",
 * port: process.env.SMTPPORT || 587,
 * secure: process.env.SMTPSECURE || false, // true for 465, false for other ports
 * user: process.env.SMTPUSER || 'casimir.mcglynn@ethereal.email',
 * pass: process.env.SMTPPASSWORD || 'GYSA4r14EQRPB9guAK'
 * 
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true
    }
  ));

  const options = new DocumentBuilder()
    .setTitle('Leave REST API')
    .setDescription('This is API for leave service')
    .setVersion('1.0')
    .addTag('leave')
    .addBearerAuth('Authorization', 'header', 'apiKey')
    .setSchemes("http", "https")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  app.use(logger);

  SwaggerModule.setup('api/docs', app, document);

  let port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
