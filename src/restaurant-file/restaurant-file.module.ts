import { RestaurantFileEntity } from 'src/entities/restaurantFile.entity';
import { Module } from '@nestjs/common';
import { RestaurantFileService } from './restaurant-file.service';
import { RestaurantFileController } from './restaurant-file.controller';
import { S3Module } from 'nestjs-s3';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestauranFileRepository } from './restauranFileRepository';
import { AuthModule } from 'src/auth/auth.module';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { RestaurantRestaurantBranchModule } from 'src/branch/branch.module';

@Module({
  imports: [
    AuthModule,
    RestaurantModule,
    // S3Module.forRoot({
    //   config: {
    //     accessKeyId: "minioadmin",
    //     secretAccessKey: "minioadmin",
    //     endpoint: 'localhost:9000',
    //     s3ForcePathStyle: true,
    //     signatureVersion: 'v4',
    //   },
    // }),
    // MinioModule.register({
    //   endPoint: process.env.MINIO_ENDPOINT,
    //   port: parseInt(process.env.MINIO_PORT),
    //   useSSL: true,
    //   accessKey: process.env.MINIO_ACCESSKEY,
    //   secretKey: process.env.MINIO_SECRETKEY
    //   }),  
    TypeOrmModule.forFeature([RestaurantFileEntity]),
    RestaurantRestaurantBranchModule
  ],
  providers: [RestaurantFileService],
  controllers: [RestaurantFileController],
  exports: [RestaurantFileService],
})
export class RestaurantFileModule {}
