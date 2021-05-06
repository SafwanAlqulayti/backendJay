import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { AuthModule } from 'src/auth/auth.module';
import { RestaurantModule } from 'src/restaurant/restaurant.module';

@Module({
  imports:[TypeOrmModule.forFeature([OrderRepository]),
  AuthModule,
  RestaurantModule
],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
