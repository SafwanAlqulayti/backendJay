import { Module } from '@nestjs/common';
import { MinioClientService,  } from './minio.service';
import { MinioClientController } from './minio.controller';
import { S3Module } from 'nestjs-s3';
var Minio = require('minio')

@Module({
  imports:[ 
    S3Module.forRoot({
      config: {
        accessKeyId: 'Q3AM3UQ867SPQQA43P2F',
        secretAccessKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
        endpoint: 'play.min.io',//'http://127.0.0.1:9000',
        s3ForcePathStyle: true,
        signatureVersion: 'v4',
      },
  })]
,  controllers: [
    MinioClientController
  ],
  providers: [MinioClientService]
  
})
export class MinioModulee {}
