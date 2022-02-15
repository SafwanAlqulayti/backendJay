import { RestaurantBranchEntity } from 'src/entities/restaurantBranch.entity';
import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantBranchRepository } from './restaurantBranch.repository';
import { RestaurantModule } from 'src/restaurant/restaurant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RestaurantBranchEntity]),
    RestaurantModule,
  ],
  controllers: [BranchController],
  providers: [BranchService],
  exports: [BranchService],
})
export class RestaurantRestaurantBranchModule {}
