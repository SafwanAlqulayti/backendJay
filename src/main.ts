import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { env } from 'node:process';
import * as config from 'config';



async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.use(morgan('tiny'));
  app.enableCors()
  await app.listen(3000)

  console.log('port:3000')
}
bootstrap();
