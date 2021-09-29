import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { env } from 'node:process';
import * as config from 'config';

console.log(`${
    process.env.DB_PASSWORD
  
  }`)

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.use(morgan('tiny'));
  app.enableCors()
  const port = process.env.PORT || 3000
  await app.listen(port,()=>{
    (`App is listening on port ${port}`)
  })

}
bootstrap();
