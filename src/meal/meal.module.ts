import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealRepository } from './mealRepository';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { CategoryModule } from 'src/category/category.module';
import { MinioModulee } from 'src/minio/minio.module';

@Module({
  imports:[RestaurantModule,CategoryModule ,
    MinioModulee,
    RestaurantModule, 
    TypeOrmModule.forFeature([MealRepository])],
  providers: [MealService],
  controllers: [MealController],
  exports:[MealService]
})
export class MealModule {}
