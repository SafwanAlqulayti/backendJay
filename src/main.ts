import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

console.log(`${
    process.env.DB_PASSWORD
  
  }`)

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });
  console.log('start///////////////');
  
  app.useGlobalPipes(new ValidationPipe());
  app.use(morgan('tiny'));
  app.enableCors()
  const port = process.env.PORT || 3000
  await app.listen(port,()=>{
    (`App is listening on port ${port}`)
  })

}
bootstrap();
