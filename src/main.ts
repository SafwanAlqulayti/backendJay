import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { setupSwagger } from './config/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';

console.log(`${process.env.DB_PASSWORD}`);

async function bootstrap() {
  const app = await NestFactory.create(AppModule,new ExpressAdapter());//{ cors: true } for PROD
  // const config = new DocumentBuilder()
  //   .setTitle('Jay example')
  //   .setDescription('Jay API description')
  //   .setVersion('1.0')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);
  setupSwagger(app);

  app.useGlobalPipes(new ValidationPipe());
  app.use(morgan('tiny'));
  app.enableCors();
  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    `App is listening on port ${port}`;
  });
}
bootstrap();
