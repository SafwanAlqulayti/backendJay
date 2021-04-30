import { Module } from '@nestjs/common';
import { MinioClientService,  } from './minio.service';
import { MinioClientController } from './minio.controller';
import { S3Module } from 'nestjs-s3';
var Minio = require('minio')

@Module({
  imports:[ 
    S3Module.forRoot({
      config: {
        accessKeyId: 'minioadmin',
        secretAccessKey: 'minioadmin',
        endpoint: 'http://localhost:9000',//'http://127.0.0.1:9000',
        s3ForcePathStyle: true,
        signatureVersion: 'v4',
      },
  })]
,  controllers: [
    MinioClientController
  ],
  providers: [MinioClientService],
  exports:[MinioClientService]
  
})

export class MinioModulee {}
