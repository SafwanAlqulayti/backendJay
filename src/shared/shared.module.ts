import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { SharedController } from './shared.controller';
import { GeoLocationService } from './services/location';
import { HttpModule } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  controllers: [SharedController],
  providers: [SharedService, GeoLocationService],
  exports: [GeoLocationService]
})
export class SharedModule { }
