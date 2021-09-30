import { CategoryEntity } from 'src/entities/category.entity';
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {CategoryRepo} from './category.repository'
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { RestaurantBranchEntity } from 'src/entities/restaurantBranch.entity';
import { RestaurantRestaurantBranchModule } from 'src/branch/branch.module';

@Module({

  imports:[AuthModule,RestaurantModule , TypeOrmModule.forFeature([CategoryEntity]),
RestaurantRestaurantBranchModule
],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports:[CategoryService]

})
export class CategoryModule {}
