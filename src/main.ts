import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.useGlobalPipes(new ValidationPipe());
   app.use(morgan('combined'))
  app.enableCors()
  await app.listen(3000);

  console.log('port:3000')
}
bootstrap();
