import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/getUser.decorator';
import { BucketDto } from './dto/bucketDto';
import { CreateRestaurantFileDto } from './dto/createRestaurantFileDto';
import { RestaurantFileService } from './restaurant-file.service';
@ApiTags('Restaurant file')
@Controller('restaurant-file')
export class RestaurantFileController {
  constructor(private _restaurantFileService: RestaurantFileService) {}

  @Post('upload-opject')
  @UseInterceptors(FileInterceptor('file'))
  uploudFile(@UploadedFile() file, @Body() data: CreateRestaurantFileDto) {
    return this._restaurantFileService.putOpject(file, data);
  }

  @Get('download/:bucket/:id')
  async downloadFile(@Param('Bucket') bucket, @Param('id') id, @Res() res) {
    return res.send(await this._restaurantFileService.downloadFile(bucket, id));
  }

  @Post('make-bucket')
  makeBucket(@Body() bucket: BucketDto) {
    //@GetUser() user
    return this._restaurantFileService.makeBucket(bucket);
  }
  //   @Get('get-all-buckets')
  // getAllBucket() {
  //     return this._restaurantFileService.getAllBuckets()
  // }
  // @Delete('remove-bucket')
  // @UsePipes(ValidationPipe)
  // removeBucket(@Body() bucket:BucketDto) {
  //     return this._restaurantFileService.removeBucket(bucket)
  // }
}

// import { Controller, Post } from '@nestjs/common';

// @Controller('resaurant-file')
// export class RestaurantFileController {
//     constructor(
//         private _restaurantFileService:RestaurantService
//     ){}

//     @Post()
//     uploadFile(){

//     }
// }
// @UseInterceptors(FileInterceptor('file'))
// @Post('file')
// uploadFile(
//   @UploadedFile() file: Express.Multer.File,
// ) {
//   return this._restaurantFileService.upload(file)
// }

// @Get()
// getImage(){
//     return this._restaurantFileService.getImage()
// }

// @Delete('remove-opject')
// removeOpject(@Body() data) {//{Bucket: , Key:}
//     return this._restaurantFileService.removeOpject(data)
// }

// @Post('bucket-exists')
// bucketExists(@Body() bucket) {
//     return this._restaurantFileService.bucketExists(bucket)
// }

// @Post('list-opjects')
// listOpjects(@Body() bucket){
//     return this._restaurantFileService.listOpjects(bucket)
// }
