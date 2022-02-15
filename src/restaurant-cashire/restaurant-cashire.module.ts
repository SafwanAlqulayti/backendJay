import { Module } from '@nestjs/common';
import { RestaurantCashireService } from './restaurant-cashire.service';
import { RestaurantCashireController } from './restaurant-cashire.controller';

@Module({
  controllers: [RestaurantCashireController],
  providers: [RestaurantCashireService],
})
export class RestaurantCashireModule {}
