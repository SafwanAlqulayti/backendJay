import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantRepository } from './restaurantRepository';
import { AuthModule } from 'src/auth/auth.module';
import { MinioModulee } from 'src/minio/minio.module';


@Module({
  imports:[AuthModule,
    MinioModulee,
    TypeOrmModule.forFeature([RestaurantRepository]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
  exports:[RestaurantService]
})
export class RestaurantModule {}
