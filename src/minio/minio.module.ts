import { Module } from '@nestjs/common';
import { MinioClientService,  } from './minio.service';
import { MinioClientController } from './minio.controller';
import { MinioModule } from 'nestjs-minio-client'
@Module({
  imports:[
    MinioModule.register({
      endPoint: "localhost",
      port: parseInt(process.env.MINIO_PORT),
      useSSL: true,
      accessKey: "minioadmin",
      secretKey: "minioadmin"
      }),],
  controllers: [
    MinioClientController
  ],
  providers: [MinioClientService]
})
export class MinioModulee {}
