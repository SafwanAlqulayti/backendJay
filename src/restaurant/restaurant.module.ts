import { RestaurantEntity } from 'src/entities/restaurant.entity';
import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { MinioModulee } from 'src/minio/minio.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    AuthModule,
    MinioModulee,
    TypeOrmModule.forFeature([RestaurantEntity]),
    SharedModule,
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
  exports: [RestaurantService],
})
export class RestaurantModule {}
