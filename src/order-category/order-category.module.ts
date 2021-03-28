import { Module } from '@nestjs/common';
import { OrderCategoryService } from './order-category.service';
import { OrderCategoryController } from './order-category.controller';
import { MealService } from 'src/meal/meal.service';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { CategoryModule } from 'src/category/category.module';
import { OrderCategoryRepository } from './order-categort.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealModule } from 'src/meal/meal.module';

@Module({
  imports:[RestaurantModule,MealModule ,
    TypeOrmModule.forFeature([OrderCategoryRepository])],
  controllers: [OrderCategoryController],
  providers: [OrderCategoryService]
})
export class OrderCategoryModule {}
