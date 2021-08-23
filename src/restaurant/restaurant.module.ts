import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantRepository } from './restaurantRepository';
import { AuthModule } from 'src/auth/auth.module';
import { MinioModulee } from 'src/minio/minio.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    AuthModule,
    MinioModulee,
    TypeOrmModule.forFeature([RestaurantRepository]),
    SharedModule
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
  exports: [RestaurantService],
})
export class RestaurantModule {}
