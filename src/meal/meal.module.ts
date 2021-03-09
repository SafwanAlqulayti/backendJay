import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealRepository } from './mealRepository';
import { RestaurantModule } from 'src/restaurant/restaurant.module';

@Module({
  imports:[RestaurantModule,
    TypeOrmModule.forFeature([MealRepository])],
  providers: [MealService],
  controllers: [MealController]
})
export class MealModule {}
