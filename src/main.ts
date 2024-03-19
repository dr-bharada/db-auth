import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { GlobalExceptionFilter } from './common/global-exception/global-exception.filter';
import { swaggerConfig } from './common/config/swagger.config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter());
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('Auth', app, document);
  mongoose.set(
    'debug',
    (collectionName, method, query, doc) => {
      console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
    }
  );
  await app.listen(3000);
}
bootstrap();
