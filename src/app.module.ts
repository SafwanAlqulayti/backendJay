import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { typeOrm } from './config/typeOrm.config';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [AuthModule,TypeOrmModule.forRoot(typeOrm), RestaurantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
