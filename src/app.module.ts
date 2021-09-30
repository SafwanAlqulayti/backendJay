import { ConfigService } from '@nestjs/config';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
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
import { MiddlewareConsumer } from '@nestjs/common';
import { AppLoggerMiddleware } from './middleware/loggerMiddleware';
import { RestaurantRestaurantBranchModule } from './branch/branch.module';
import { config } from 'process';
import { typeOrm } from './config/typeOrm.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      // load: ['shared/services/config.service'],
    }),
    SharedModule,
    forwardRef( () => TypeOrmModule.forRoot(typeOrm)),
    AuthModule,
    RestaurantModule, RestaurantFileModule, MealModule, CategoryModule, OrderCategoryModule, OrderCategoryDetailModule, MinioModulee, UserRepository,
    OrderModule,
    RestaurantRestaurantBranchModule,

  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
