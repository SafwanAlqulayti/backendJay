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
import { UserRepository } from './auth/auth.repository';
import { SharedModule } from './shared/shared.module';
import messagebird from 'messagebird'
import { OrderModule } from './order/order.module';




@Module({
  imports: [   
    ConfigModule.forRoot({
    envFilePath: '.development.env',
  }),
    AuthModule,
<<<<<<< HEAD
    TypeOrmModule.forRoot(typeOrm), RestaurantModule, RestaurantFileModule, MealModule, CategoryModule, OrderCategoryModule, OrderCategoryDetailModule, MinioModulee,UserRepository, SharedModule
=======
    TypeOrmModule.forRoot(typeOrm),
     RestaurantModule, RestaurantFileModule, MealModule, CategoryModule, OrderCategoryModule, OrderCategoryDetailModule, MinioModulee,UserRepository,
     OrderModule
>>>>>>> d5819696a379c902cda118b82a6abea0add8e2ab
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
