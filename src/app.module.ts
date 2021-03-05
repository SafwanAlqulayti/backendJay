import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { typeOrm } from './config/typeOrm.config';

@Module({
  imports: [AuthModule,TypeOrmModule.forRoot(typeOrm)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
