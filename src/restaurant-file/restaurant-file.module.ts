import { Module } from '@nestjs/common';
import { RestaurantFileService } from './restaurant-file.service';
import { RestaurantFileController } from './restaurant-file.controller';
import { S3Module } from 'nestjs-s3';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestauranFileRepository } from './restauranFileRepository';
import { AuthModule } from 'src/auth/auth.module';
import { RestaurantModule } from 'src/restaurant/restaurant.module';

@Module({
  imports: [
    AuthModule,
    RestaurantModule,
    S3Module.forRoot({
      config: {
        accessKeyId: process.env.MINIO_ACCESSKEY,
        secretAccessKey: process.env.MINIO_SECRETKEY,
        endpoint: process.env.MINIO_ENDPOINT,
        s3ForcePathStyle: true,
        signatureVersion: 'v4',
      },
    }),
    TypeOrmModule.forFeature([RestauranFileRepository]),
  ],
  providers: [RestaurantFileService],
  controllers: [RestaurantFileController],
  exports: [RestaurantFileService],
})
export class RestaurantFileModule {}
