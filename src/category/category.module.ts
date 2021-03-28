import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {CategoryRepo} from './category.repository'
import { RestaurantModule } from 'src/restaurant/restaurant.module';

@Module({

  imports:[AuthModule,RestaurantModule , TypeOrmModule.forFeature([CategoryRepo])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports:[CategoryService]

})
export class CategoryModule {}
