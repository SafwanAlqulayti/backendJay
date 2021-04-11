import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { typeOrm } from './config/typeOrm.config';
import { RestaurantModule } from './restaurant/restaurant.module';
import { RestaurantFileModule } from './restaurant-file/restaurant-file.module';
import { ConfigModule } from '@nestjs/config';
import { MealModule } from './meal/meal.module';
import { CategoryModule } from './category/category.module';
import { OrderCategoryModule } from './order-category/order-category.module';
import { OrderCategoryDetailModule } from './order-category-detail/order-category-detail.module';
import { MinioModulee } from './minio/minio.module';
import * as config from "../src/config/typeOrm.config"
import { UserRepository } from './auth/auth.repository';



@Module({
  imports: [   
    ConfigModule.forRoot({
    envFilePath: '.development.env',
  }),
    AuthModule,
    TypeOrmModule.forRoot(typeOrm), RestaurantModule, RestaurantFileModule, MealModule, CategoryModule, OrderCategoryModule, OrderCategoryDetailModule, MinioModulee,UserRepository
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
