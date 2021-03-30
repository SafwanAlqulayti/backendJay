import { Module } from '@nestjs/common';
import { OrderCategoryDetailService } from './order-category-detail.service';
import { OrderCategoryDetailController } from './order-category-detail.controller';
import { OrderCategoryModule } from 'src/order-category/order-category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderCategoryRepository } from './order-category-detail.repository';

@Module({
  imports:[OrderCategoryModule ,
    TypeOrmModule.forFeature([OrderCategoryRepository])],
  controllers: [OrderCategoryDetailController],
  providers: [OrderCategoryDetailService]
})
export class OrderCategoryDetailModule {}
