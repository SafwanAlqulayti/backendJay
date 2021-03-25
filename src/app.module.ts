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
import * as config from "../src/config/typeOrm.config"



@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.development.env',
  }),
    AuthModule,TypeOrmModule.forRoot(typeOrm), RestaurantModule, RestaurantFileModule, MealModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
