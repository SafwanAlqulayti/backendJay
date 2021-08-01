import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { AuthModule } from 'src/auth/auth.module';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { MealModule } from 'src/meal/meal.module';

@Module({
  imports:[TypeOrmModule.forFeature([OrderRepository]),
  AuthModule,
  RestaurantModule,
  MealModule
],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
